const express = require('./node_modules/express'); //de facto node framework
const bodyParser= require('./node_modules/body-parser'); //handles reading data from forms
const MongoClient = require('./node_modules/mongodb').MongoClient; //database
const ObjectId = require('./node_modules/mongodb').ObjectId;
const cors = require('./node_modules/cors');

const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var db;

//connect to the MongoDB
MongoClient.connect('mongodb+srv://User2:a1QaehxEiQl0xSts@companion-okgix.azure.mongodb.net', (err, client) => {
  if (err) return console.log(err);

  db = client.db('Companion'); //Sets the database to work with

  //starts a server
  app.listen(5000, () => {
    console.log('listening on port 5000')
  })
})

app.get('/get-mood/:id', (req, res)=>{
  db.collection('Moods').findOne({_id: ObjectId(req.params.id)}).then((result, err)=>{
    if (err) console.log(err)
    res.json({mood: result});
  })
})


app.get('/get-moods', (req, res)=>{
  db.collection('Moods').find().toArray((err, result) => {
    if (err) return console.log(err);

    res.json({moods: result});
  })
})

app.post('/add-mood', (req, res)=>{
  db.collection('Moods').insertOne(req.body, (err, result) => {
    if (err) console.log(err)
    console.log('saved to database: ', req.body) //debug console message
  })
})

app.get('/delete-mood/:id', (req, res) => {
  db.collection('Moods').deleteOne({_id:ObjectId(req.params.id)}, function (err, result) {
    if (err) console.log(err)
    console.log('deleted off database') //debug console message
  })
})

//Saves form data and redirects back to home page.
app.put('/edit-mood/:id', (req, res) => {
  db.collection('Moods').updateOne({_id: ObjectId(req.params.id)}, {$set: {"mood": req.body.mood}})
  console.log('updated database') //debug console message
})
