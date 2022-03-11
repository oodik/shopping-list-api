// create an express app
const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

app.get('/api', (req, res) => {
    res.send("test data OK");
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
