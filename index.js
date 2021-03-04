
const express = require('express')
var ObjectId = require('mongodb').ObjectID;
const bodyParser=require('body-parser');
const cors=require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.i7d38.mongodb.net:27017,cluster0-shard-00-01.i7d38.mongodb.net:27017,cluster0-shard-00-02.i7d38.mongodb.net:27017/VolunteerNetwork?ssl=true&replicaSet=atlas-123ytz-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
const app = express()

const port = 5000;


app.get('/',(req,res)=>{
  res.send('response');
})

app.use(bodyParser.json())
app.use(cors())




client.connect(err => {
  const EventCollection = client.db("VolunteerNetwork").collection("database");
  
  const RegisterCollection = client.db("VolunteerNetwork").collection("registerVolunteer");
  
console.log('database connected');

//  app.post('/addEvent',(req,res)=>{
//    const event= req.body;
//     console.log(event);
//    EventCollection.insertMany(event)
//    .then(result=>{
//      console.log(result.insertedCount)
//        res.send(result.insertedCount)
//    })
   
//  })

//  app.get('/allEvents',(req,res)=>{
//    EventCollection.find({})
//    .toArray((err,document)=>{
//     res.send(document)
//    })
//  })

//  app.post('/addRegister', (req, res) => {
   
//   const register = req.body;
//   RegisterCollection.insertOne(register)
//     .then(result => {
//       res.send(result.insertedCount > 0)
//     })
// })

// app.get('/registerList',(req,res)=>{
//   // console.log(req.query.email)
//   RegisterCollection.find({email:req.query.email})
//   .toArray((err,document)=>{
//     res.send(document);

//   })
// })

// app.get('/allVolunteer', (req, res) => {
//   RegisterCollection.find({})
//     .toArray((err, documents) => {
//       res.send(documents)
//     })
// })


  
// });


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(process.env.PORT|| port);











  //post all fakeData to server
  app.post('/addEvents', (req, res) => {
    const event = req.body;
    EventCollection.insertMany(event)
      .then(result => {
        console.log(result.insertedCount)
        res.send(result.insertedCount)
      })
  })

  // post single event to server
  app.post('/singleEvent', (req, res) => {
    const event = req.body;
    EventCollection.insertOne(event)
      .then(result => {
        console.log(result)
        res.send(result)
      })
  })

  //get all events from server
  app.get('/allEvents', (req, res) => {
    EventCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  //add volunteer info from register
  app.post('/addVolunteer', (req, res) => {
    const volunteer = req.body;
    RegisterCollection.insertOne(volunteer)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  //get registered volunteer through email
  app.get('/volunteer', (req, res) => {
    RegisterCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  //get all registered volunteer
  app.get('/allVolunteer', (req, res) => {
    RegisterCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  //delete 
  app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)
    RegisterCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })

});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)