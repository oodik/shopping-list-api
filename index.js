// create an express app
const express = require("express");
const app = express();



const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

// use the express-static middleware
app.use(express.static("public"));
// define the first route
app.get("/api/movie", async function (req, res) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  
  try {
    await client.connect();

    const database = client.db('sample_mflix');
    const collection = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { genres: "Comedy", poster: { $exists: true } };
    const cursor = await collection.aggregate([
      { $match: query },
      { $sample: { size: 1 } },
      { $project: 
        {
          title: 1,
          fullplot: 1,
          poster: 1
        }
      }
    ]);

    const movie = await cursor.next();

    return res.json(movie);
  } catch(err) {
    console.log(err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

const key = "1234";


const listSchema = new mongoose.Schema({
    name: String,
    date: String,
    createdBy: String,
    type: String
});

const ListMongo = mongoose.model('List', listSchema);

const item = new ListMongo({
    name: těstoviny,
    date: idk,
    createdBy: oodik,
    type: jidlo
});
item.save()

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
