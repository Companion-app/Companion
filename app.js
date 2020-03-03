const express = require('./node_modules/express'); //de facto node framework
const bodyParser= require('./node_modules/body-parser'); //handles reading data from forms
const hbs = require('./node_modules/hbs/lib/hbs'); //templating engine
const MongoClient = require('./node_modules/mongodb').MongoClient; //database
const assert = require('./node_modules/assert');

const app = express();
var db;

//connect to the MongoDB
MongoClient.connect('mongodb+srv://User2:a1QaehxEiQl0xSts@companion-okgix.azure.mongodb.net', (err, client) => {
  if (err) return console.log(err);


  db = client.db('Companion'); //Sets the database to work with

  //starts a server
  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}))
app.set('viewEngine', 'hbs' );

//Route incoming urls to functionality
//req and res stand for request and response
app.get('/', (req, res) => {

  //read all notes from the Notes collection
  db.collection('Moods').find().toArray((err, result) => {
    if (err) return console.log(err)

    //To pass variables to a view, include an object as a second parameter. Here we pass "result" data. 
    //The view will reference it as "notes"
    res.render('index.hbs', {moods: result}) //by default, hbs views are placed in a "views" folder. 
  })
})

//display the "Add note" form
app.get('/add-mood', (req, res) => {

   res.render('add-mood.hbs'); //by default, hbs views are placed in a "views" folder
})

//Saves form data and redirects back to home page.
app.post('/moods', (req, res) => {
   db.collection('Moods').insertOne(req.body, (err, result) => {
    // if (err) console.log(err)

    console.log('saved to database') //debug console message
    res.redirect('/')
  })
})


app.get('/delete-mood', (req, res) => {

  res.render('delete-mood.hbs'); //by default, hbs views are placed in a "views" folder

  db.collection('Moods').deleteOne({"_id": objectId(id)}, function (err, result) {
    console.log(objectId(id))
    if (err) console.log(err)

    console.log('deleted off database') //debug console message
    res.redirect('/')
  })
  
})
