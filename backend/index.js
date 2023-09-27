if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Image = require('./models/image')
const bodyParser = require('body-parser')
const dbUrl = process.env.DB_URL;

//mongoose.connect('mongodb://localhost:27017/image-uploader')
mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(cors())
app.use(express.urlencoded({ extended: true })); // Needed to parse urls
app.use(bodyParser.json())

app.post("/api", (req, res) => {
    //console.log('api/upload req.body: ', req.body)
    const image = new Image({
        imageLink: req.body.imageLink,
        label: req.body.label,
    })
    image.save()
    res.status(200).send(`received ${req.body}`)
})

app.get("/api", async (req, res) => {
    const images = await Image.find({})
    res.json(images)
})

app.get("/api/:id", async (req, res) => {
    const { id } = req.params
    const image = await Image.findById(id)
    res.json(image)
})

app.put("/api/:id", async (req, res) => {
    const { id } = req.params
    await Image.findByIdAndUpdate(id, {label: req.body.label})
})

app.delete("/api/:id", async (req, res) => {
    const { id } = req.params
    await Image.findByIdAndDelete(id)
    res.status(200).send(`Deleted ${id} successfully`)
})

app.listen(8000, () => {
    console.log("Server started on port 8000")
})