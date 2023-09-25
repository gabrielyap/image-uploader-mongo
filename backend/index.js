const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Image = require('./models/image')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/image-uploader')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(cors())
app.use(express.urlencoded({ extended: true })); // Needed to parse urls
app.use(bodyParser.json())

app.post("/api/upload", (req, res) => {
    console.log('api/upload req.body: ', req.body)
    const image = new Image({
        imageLink: req.body.imageLink,
        label: req.body.label,
    })
    image.save()
    res.status(200).send(`received ${req.body}`)
})

app.get("/api/getlinks", async (req, res) => {
    const links = await Image.find({})
    //console.log("Sending this to client: ", links)
    res.json(links)
})

app.listen(8000, () => {
    console.log("Server started on port 8000")
})