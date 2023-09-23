const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Image = require('./models/image')

mongoose.connect('mongodb://localhost:27017/image-uploader')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(cors())

app.get("/api/home", (req, res) => {
    const image = new Image({
        imageLink: "https://static.miraheze.org/greatcharacterswiki/f/fb/Gfhdfhddghhkfgh.png"
    })
    image.save()
    res.send("send image of gir")
})

app.listen(8000, () => {
    console.log("Server started on port 8000")
})