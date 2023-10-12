const mongoose = require('mongoose')
const Schema = mongoose.Schema

//For now only store link, no title

const ImageSchema = new Schema({
    imageLink: String,
    label: String,
    author: String,
})

module.exports = mongoose.model('Image', ImageSchema)