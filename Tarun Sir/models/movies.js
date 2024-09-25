const {Schema, model} = require("mongoose")

const movieSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    genres: {
        type: [String]
    },
    type: {
        type: String
    },
    plot: {
        type: String
    },
    year: {
        type: Number
    },
    runtime: {
        type: Number
    }
})

const movies = model("movies", movieSchema)

module.exports = movies