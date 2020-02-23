const http = require('http');
const express = require('./node_modules/express'); //de facto node framework
const MongoClient = require('./node_modules/mongodb').MongoClient; //database
const bodyParser= require('body-parser'); //handles reading data from forms
const hbs = require('hbs'); //templating engine
const hostname = '127.0.0.1';
const port = 3000;



const app = express();
var db;

// MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//   if (err) return console.log(err);


//   db = client.db('Companion'); //Sets the database to work with

//   //starts a server
//     app.listen(port, hostname, () =>{ 
//         console.log(`Server running at http://$localhost:$3000/`);
//     });
// })

MongoClient.connect('mongodb+srv://User1:i4QWO7qACRSlr6r8@companion-okgix.azure.mongodb.net/', function(err, db) {
    if (err) throw err;
    var dbo = db.db("Companion");
    var myobj = [
      { mood: 'defeated'},
      { mood: 'depressed'},
      { mood: 'anxious'}
    ];
    dbo.collection("Moods").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });

    app.listen(port, hostname, () =>{ 
        console.log(`Server running at http://$localhost:$3000/`);
    });

  });



// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://$localhost:$3000/`);
// });