const express = require('./node_modules/express');
const bodyParser= require('./node_modules/body-parser');
const MongoClient = require('./node_modules/mongodb').MongoClient;
const ObjectId = require('./node_modules/mongodb').ObjectId;
const cors = require('./node_modules/cors');
const session = require('express-session');
const {check, validationResult} = require('./node_modules/express-validator');
const bcrypt = require('./node_modules/bcrypt');

const app = express();
app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json());
app.use(session({
  name: 'data',
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

MongoClient.connect('mongodb+srv://User2:a1QaehxEiQl0xSts@companion-okgix.azure.mongodb.net', (err, client) => {
  if (err) return console.log(err);
  db = client.db('Companion'); //Sets the database to work with
})

app.listen(5000, () => {
  console.log('listening on port 5000')
})

/* ========== USERS ========== */
app.get('/get-user/:id', (req, res) => {
  db.collection('UserDetails').findOne({
    '_id': ObjectId(req.params.id)
  }).then((result, err) => {
    if (err) console.log(err);
    console.log(result)
    res.json(result);
  })
})

app.post('/register', [
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({min:6, max:20}).trim().escape()
], (req, res) => {
  // console.log(req.body)
  if(req.body.diagnosis){
    diagnosis = req.body.diagnosis
  }else{
    diagnosis = ''
  }
  bcrypt.hash(req.body.password, 10, function(err, hash) {
      db.collection('UserDetails').insertOne({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      dob: req.body.birthday,
      diagnosis: diagnosis,
      moods: {},
      meds: {}
    }, (err, result) => {
      if (err) console.log(err)
      res.sendStatus(200)
    })
  });
})

app.post('/login', (req, res) => {
  db.collection('UserDetails').findOne({
    email: req.body.email
  }).then(user => {
    if(user !== null) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(result){
          req.session.user = {
            id: user._id,
            email: user.email
          }
          req.session.save()
          res.json(req.session.user)
        }
      });
    }
    else {
      console.log('Error. Please try again')
      res.sendStatus(400);
    }
  });
});


app.post('/logout', (req, res)=>{
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
        if(err) {
            return next(err);
        } else {
            req.session = null;
            console.log("logout successful");
            res.sendStatus(200);
            // return res.redirect('/');
        }
    });
  }  
})

app.get('/get-profile', (req, res)=>{
  if(req.session) {
    db.collection('UserDetails').findOne(
      {'_id': ObjectId(req.query.id)},
      function(err, result){
        console.log(result)
        res.json({
          name: result['name'],
          birthday: result['dob'],
          diagnosis: result['diagnosis']
        });
      }
    )
  }
})


/* ========== MOODS ========== */
app.get('/get-moods', (req, res) => {
  const result = db.collection('UserDetails').findOne(
    {'_id': ObjectId(req.query.id)},
    function(err, result){
      console.log(result)
      res.json({moods: result['moods']});

    }
  )
})

app.post('/add-mood', (req, res)=>{
  db.collection('UserDetails').updateOne(
    {'_id': ObjectId(req.body.id)},
    {
      $inc: {
        [`moods.${req.body.mood}.counter`]: 1
      }
    },
    (err, result) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    console.log('saved to database: ', req.body)
    res.sendStatus(200)
  })
})

app.post('/delete-mood', (req, res) => {
  console.log(req.body)
  db.collection('UserDetails').updateOne({
    _id:ObjectId(req.body.id)},
    {$unset: {[`moods.${req.body.mood}`] : {}}},
    function (err, result) {
      if (err) res.sendStatus(500)
      console.log('deleted off database')
      res.sendStatus(200)
  })
})

app.put('/edit-mood', (req, res) => {
  db.collection('UserDetails').updateOne({_id:ObjectId(req.body.userId)}, {$rename: {[`moods.${req.body.oldMood}`]: `moods.${req.body.newMood}`}})
  console.log('updated database')
  res.sendStatus(200)
})

/* ========== MEDS ========== */

app.get('/get-meds', (req, res) => {
  const result = db.collection('UserDetails').findOne(
    {'_id': ObjectId(req.query.id)},
    function(err, result){
      console.log(result)
      res.json({meds: result['meds']});

    }
  )
})

app.post('/add-med', (req, res)=>{
  console.log(req.body)

  db.collection('UserDetails').updateOne(
    {'_id': ObjectId(req.body.id)},
    { $set: {
      [`meds.${req.body.med}`] : req.body.notes
    }
      // $inc: {
      //   [`meds.${req.body.med}.counter`]: 1
      // }
    },
    (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
      return
    }
    console.log('saved to database: ', req.body)
    res.sendStatus(200)
  })
})

app.post('/delete-med', (req, res) => {
  console.log(req.body)
  db.collection('UserDetails').updateOne({
    _id:ObjectId(req.body.id)},
    {$unset: {[`meds.${req.body.med}`] : {}}},
    function (err, result) {
      if (err) res.sendStatus(500)
      console.log('deleted off database')
      res.sendStatus(200)
  })
})

app.put('/edit-med', (req, res) => {
  console.log(req.body)
  let update;
  if (req.body.oldMed === req.body.newMed){
    update = {
      $set: {[`meds.${req.body.newMed}`] : req.body.notes}
    }
  }else{
    update = {
      $unset: {[`meds.${req.body.oldMed}`] : ''},
      $set: {[`meds.${req.body.newMed}`] : req.body.notes}
    }
  }
  db.collection('UserDetails').updateOne({
      _id:ObjectId(req.body.id)
    },
      update,
    // {
    //   $rename: 
    //   {
    //     [`meds.${req.body.oldMed}`]: `meds.${req.body.newMed}`
    //   }
    // },
    function (err,result){
      if(err) {
        console.log(err)
        res.sendStatus(500)
      }
      console.log('updated database')
      res.sendStatus(200)
    }
  )
})



/* ========== LogEntries ========== */
app.post('/add-logentry', (req, res) => {
  var date = new Date()
  db.collection('LogEntries').insertOne({
    'userId': ObjectId(req.body.userId),
    'timestamp': `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    'event': req.body.event,
    'details': req.body.details
  })
})
