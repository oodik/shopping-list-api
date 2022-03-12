// create an express app
const express = require("express");
const app = express();
var port = process.env.PORT || 1337;


const list = [{id:0, name: "piti", date:"udas"}];


// const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB... ', err));


const listSchema = new mongoose.Schema({
    name: String,
    date: String,
    createdBy: String,
    type: String
});

const ListMongo = mongoose.model('List', listSchema);










const key = "1234";

app.get("/api/shopping-list", (req, res) => {

    async function getItems() {
      const itemsGet = await ListMongo.find();
     }
        
        res.send(getItems())

});

app.post('/api/shopping-list', (req, res) => {


    async function saveItem() {
      
    const itemPost = new ListMongo({
      name: req.body.name,
      date: req.body.date,
      createdBy: req.body.who,
      type: req.body.type
      });
      itemPost.save();
      console.log(result.id);
    }
  
    res.send("uspěšné");

});

app.delete('/api/shopping-list/:id', (req, res) => {
    if (req.body.key == key) {
    const id = Number(req.params.id);
    const item = list.find(item => item.id === id);
    console.log(req.params)
    if (!item) {
        res.status(404).send('položka nebyla nalezena.');
    } else {
        const index = list.indexOf(item);
        list.splice(index, 1);
        res.send(item);
    }} else {
        res.send("key error");
    }
});

app.listen(port, () => console.log("Listening on port " + port + "..."));
