const http = require('http');
const express = require('./node_modules/express'); //de facto node framework
const MongoClient = require('./node_modules/mongodb').MongoClient; //database
const bodyParser= require('./node_modules/body-parser'); //handles reading data from forms
const hbs = require('./node_modules/hbs/lib/hbs'); //templating engine

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
var db;

MongoClient.connect('mongodb+srv://User2:a1QaehxEiQl0xSts@companion-okgix.azure.mongodb.net/', (err, client) => {
  if (err) return console.log(err);

db = client.db('Companion'); //Sets the database to work with


  //starts a server
    app.listen(port, hostname, () =>{ 
        console.log(`Server running at http://$localhost:$3000/`);
    });
})

// localhost:27017
MongoClient.connect('mongodb+srv://User2:a1QaehxEiQl0xSts@companion-okgix.azure.mongodb.net/', function(err, db) {
    if (err) throw err;
    // db = db.db('Companion')
    var dbo = db.db("Companion");
    // var myobj = [
    //   { mood: 'happy'},
    //   { mood: 'anxious'},
    //   { mood: 'nervous'}
    // ];
    // dbo.collection("Moods").insertMany(myobj, function(err, res) {
    //   if (err) throw err;
    //   console.log("Number of documents inserted: " + res.insertedCount);
    //   db.close();
    // });

    // app.listen(port, hostname, () =>{ 
    //     console.log(`Server running at http://$localhost:$3000/`);
    // });

  });

app.use(bodyParser.urlencoded({extended: true}))
app.set('viewEngine', 'hbs' );

app.get('/', (req, res) => {

    //read all notes from the Notes collection
    db.collection('Moods').find().toArray((err, result) => {
      if (err) return console.log(err)
  
      //To pass variables to a view, include an object as a second parameter. Here we pass "result" data. 
      //The view will reference it as "notes"
      res.render('index.hbs', {moods: result}) //by default, hbs views are placed in a "views" folder. 
    })
  })
  
  app.get('/add-mood', (req, res) => {

    res.render('add-mood.hbs'); //by default, hbs views are placed in a "views" folder
 })
 
 //Saves form data and redirects back to home page.
 app.post('/moods', (req, res) => {
    db.collection('Moods').insertOne(req.body, (err, result) => {
     if (err) return console.log(err)
 
     console.log('saved to database') //debug console message
     res.redirect('/')
   })
 })
