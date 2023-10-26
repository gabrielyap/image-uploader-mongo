
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const Comment = require('./comment')
const ImageSchema = new Schema({
    imageLink: String,
    label: String,
    author: String,
    comments: [{
        content: String,
        author: String
}]
})

module.exports = mongoose.model('Image', ImageSchema)
