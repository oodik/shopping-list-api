// create an express app
const express = require("express");
const app = express();



const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

mongodb.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB... ', err));


const listSchema = new mongodb.Schema({
    name: String,
    date: String,
    createdBy: String,
    type: String
});

const ListMongo = mongodb.model('List', listSchema);

const item = new ListMongo({
    name: těstoviny,
    date: idk,
    createdBy: oodik,
    type: jidlo
});
item.save()












const key = "1234";

app.get("/api/shopping-list", (req, res) => {

        res.send(list);

        res.send("key error");
        console.log(req.body)

    
});

app.post('/api/shopping-list', (req, res) => {
    if (req.body.key == key) {
    const item = {
        id: list.length + 1,
        name: req.body.name,
        date: req.body.date
    };
    list.push(item);
    res.send(item);
    } else {
        res.send("key error");
    }
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

app.listen(3000, () => console.log('Listening on port 3000...'));
