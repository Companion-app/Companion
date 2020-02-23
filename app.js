const http = require('http');
const express = require('./node_modules/express'); //de facto node framework

const app = express();
var db;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) return console.log(err);


  db = client.db('NotesApp'); //Sets the database to work with

  //starts a server
  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
})

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Companion");
    var myobj = [
      { mood: 'happy'},
      { mood: 'anxious'},
      { mood: 'nervous'}
    ];
    dbo.collection("moods").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
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