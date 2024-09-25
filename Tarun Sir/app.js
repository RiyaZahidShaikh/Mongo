const express = require("express")
const mongodb = require("mongodb")
const mongoose = require("mongoose")

const Movies = require("./models/movies")

const app = express()

const URI = "mongodb+srv://riyashaikh:riya1234@cluster0.kirs1xm.mongodb.net/riya"

app.use(express.json)
app.use(express.urlencoded)

mongoose.connect(URI,{})
.then(function(){
    console.log("mongodb established using mongoose");
})
.catch(function(error){
    console.log("error:",error);
})


app.get("/", function (req, res) {
    return res.send("Greetings from server.")
})

app.get("/databases", function(req, res){
    return mongoose.connection.useDb("sample_mflix").asPromise()
    .then(function(db) {
        let names = db.collections.map((col) => col.collectionName).join(",")
        db.collections.forEach((col) => {
            console.log("---- ", col)
        })
        console.log("---- ", names)
        return res.send(names)
    })
    .catch(function(error){
        return res.send(error)
    })
})

app.get("/movies", function(req, res){
    return Movies.find({}).limit(10)
    .then(function(movies) {
        return res.json(movies)
    })
    .catch(function(error){
        return res.send(error)
    })
})

app.get("/movies/:title", function(req, res) {
    return Movies.findOne({ title: req.params.title })
    .then(function(data) {
        return res.json(data)
    })
    .catch(function(error){
        return res.send(error)
    })
})

app.post("/movies", function(req, res) {
    let newMovie = {
        title: "Madgaon Express",
        genres: ["Comedy"],
        type: "movie"
    }
    return Movies.create(newMovie)
    .then(function(data){
        return res.json(data)
    })
    .catch(function(error){
        return res.send(error)
    })
})

app.listen(8000, function () {
    console.log("server is running on port 8000")
})
