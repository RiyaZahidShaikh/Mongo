const express = require("express")
const mongodb = require("mongodb")

const app = express()

const URI = "mongodb+srv://riyashaikh:riya1234@cluster0.kirs1xm.mongodb.net/"

const client = new mongodb.MongoClient(URI)

client.addListener("open", function () {
    console.log("mongodb connection established")
})

app.get("/", function (req, res) {
    return res.send("Greetings from server.")
})

app.get("/databases", function (req, res) {
    return client.db("sample_mflix").collections()
        .then(function (collections) {
            console.log("------- ", collections)
            collections.map((collection) => {
                console.log("--collectionName-- ", collection.collectionName)
            })
            return res.send(collections.toString())
        })
        .catch(function (error) {
            return res.send(error)
        })
})

app.get("/movies", function (req, res) {
    return client.db("sample_mflix")
        .collection("movies")
        .find({ "type": "movie" })
        .limit(1)
        .toArray()
        .then(function (movies) {
            return res.json(movies)
        })
        .catch(function (error) {
            return res.send(error)
        })
})

app.get("/movies/:title", function (req, res) {
    return client.db("sample_mflix")
        .collection("movies")
        .findOne({ "title": req.params.title })
        .then(function (movie) {
            return res.json(movie)
        })
        .catch(function (error) {
            return res.send(error)
        })
})

app.put("/movies/:title", function (req, res) {
    return client.db("sample_mflix")
        .collection("movies")
        .findOneAndUpdate({ "title": req.params.title }, { $set: { ratings: "3" } })
        .then(function (movie) {
            return res.json(movie)
        })
        .catch(function (error) {
            return res.send(error)
        })
})

app.delete("/movies/:title", function (req, res) {
    return client.db("sample_mflix")
        .collection("movies")
        .findOneAndDelete({ "title": req.params.title })
        .then(function (movie) {
            return res.json(movie)
        })
        .catch(function (error) {
            return res.send(error)
        })
})

app.post("/movies", function (req, res) {
    return client.db("sample_mflix")
        .collection("movies")
        .insertOne(
            {
                "title": "Madgaon Express",
                "type": "movie",
                "genres": [
                    "comedy"
                ]
            }
        )
        .then(function (movie) {
            return res.json(movie)
        })
        .catch(function (error) {
            return res.send(error)
        })
})

app.listen(8000, function () {
    console.log("server is running on port 8000")
})
