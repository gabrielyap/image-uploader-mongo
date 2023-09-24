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
app.use(express.urlencoded({ extended: true })); // Needed to parse urls

app.post("/api/upload", (req, res) => {
    const image = new Image({
        imageLink: JSON.stringify(req.body),
    })
    image.save()
    console.log("Saved image with req.body: ", req.body)
    res.status(200).send(`received ${req.body}`)
})

app.get("/api/getlinks", async (req, res) => {
    const links = await Image.find({})
    //console.log("Sending this to client: ", links)
    res.json(links)
})

// app.get("/api/home", (req, res) => {
//     const image = new Image({
//         imageLink: "https://static.miraheze.org/greatcharacterswiki/f/fb/Gfhdfhddghhkfgh.png"
//     })
//     image.save()
//     res.send("send image of gir")
// })


app.listen(8000, () => {
    console.log("Server started on port 8000")
})