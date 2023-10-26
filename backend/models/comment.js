const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: String,
    author: String,
})

module.exports = mongoose.model('Comment', CommentSchema)