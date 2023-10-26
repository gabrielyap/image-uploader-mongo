
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//For now only store link, no title
const CommentSchema = new Schema({
    content: String,
    author: String,
})
const ImageSchema = new Schema({
    imageLink: String,
    label: String,
    author: String,
    comments: [CommentSchema]
})

module.exports = mongoose.model('Image', ImageSchema)
module.exports = mongoose.model('Comment', CommentSchema)