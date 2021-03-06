// create an express app
const express = require("express");
const app = express();
app.use(express.json());
var cors = require('cors');
var port = process.env.PORT || 1337;


app.use(cors());


// const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB... ', err));


const listSchema = new mongoose.Schema({
    id: Number,
    name: String,
    date: String,
    createdBy: String,
    type: String
});

const ListMongo = mongoose.model('Statistics', listSchema);


app.post('/api/shopping-list/autoriz', (req, res) => {
  if (req.body.key) {
    if (req.body.key === "1234") {
      res.send("uspěšné");
    } else {
      res.send("nesprávné heslo");
  }} else {
    console.log(req.body);
    res.send("key je prazdne");
  
  }
  });


app.get("/api/shopping-list", (req, res) => {

    async function getItems() {
      const itemsGet = await ListMongo.find();
      
      res.send(itemsGet);
     }
  
        getItems();
        
});

app.post('/api/shopping-list', (req, res) => {

    const itemPost = new ListMongo({
      id: ListMongo.length + 1,
      name: req.body.name,
      date: req.body.date,
      createdBy: req.body.who,
      type: req.body.type
      });

    itemPost.save();
    res.send("uspěšné");

});

app.delete('/api/shopping-list/:id', (req, res) => {

    ListMongo.findByIdAndDelete(req.params.id)
    .then(result => {
            if (result) {
              console.log(result);
                res.json(result);
            }
            else {
                res.status(404).send("nebylo nalezeno!");
            }
        })
        .catch(err => { res.send("Chyba při mazání položky! " + err) });
});
   
app.listen(port, () => console.log("Listening on port " + port + "..."));
