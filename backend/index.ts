if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Image = require('./models/image')
const Comment = require('./models/comment')
const bodyParser = require('body-parser')
const dbUrl = process.env.DB_URL;
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const flash = require('express-flash')
import {Request, Response} from 'express'
//mongoose.connect('mongodb://localhost:27017/image-uploader')
mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sessionConfig = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}
app.use(passport.initialize())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // Needed to parse urls
app.use(bodyParser.json())

app.use(flash());
app.use(session(sessionConfig))

app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

declare global {
    namespace Express {
      interface User {
        // Define any additional properties you have on your User model
        // For example, if your User model has a 'username' property:
        email: string;
        username: string;
        password: string;
      }
  
      interface Request {
        user?: User;
        isAuthenticated: () => boolean;
        logout: () => void;
      }
    }
  }

app.get("/", (req: Request, res: Response) => {
    res.send("museum server online")
})


app.post("/api", (req: Request, res: Response) => {
    console.log('api/upload req.body: ', req.body)
    const image = new Image({
        imageLink: req.body.imageLink,
        label: req.body.label,
        author: req.body.author,
        comments: req.body.comments
    })
    image.save()
    res.status(200).send(`received ${req.body}`)
})

app.post("/api/checkAuth", passport.authenticate('local', {keepSessionInfo: true}),async (req: Request, res: Response) => {
    console.log('req.session in checkauth: ', req.session)
    res.json({isAuthenticated: req.isAuthenticated(), user: req.user });
});

app.get("/api", async (req: Request, res: Response) => {
    const images = await Image.find({})
    res.json(images)
})

app.get("/api/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const image = await Image.findById(id)
    res.json(image)
})

app.put("/api/comments/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const image = await Image.findById(id)
    //const comment = new Comment({content: req.body.comment, author: req.body.author})

    const comment = {content: req.body.content, author: req.body.author, time: req.body.time}
    if (req.body.author == ""){
        comment.author = "Anonymous"
    }
    image.comments.push(comment)
    //await comment.save()
    await image.save()
    res.status(200).send(`edited ${id}`)
})

app.put("/api/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    await Image.findByIdAndUpdate(id, { label: req.body.label })
    res.status(200).send(`edited ${id}`)
})

app.patch("/api/comments/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const image = await Image.findById(id)
    image.comments.splice(req.body.commentIndex, 1)
    console.log(id, req.body)
    await image.save()
    res.status(200).send(`edited ${id}`)
})

app.post("/api/:id", passport.authenticate('local', {keepSessionInfo: true}), async (req: Request, res: Response) => {
    if (req.isAuthenticated()){
        const { id } = req.params
        console.log(req.user)
        //await Image.findByIdAndDelete(id)
        res.status(200).send(`Deleted ${id} successfully`)
        
    }
    else{
        res.status(400)
    }
})

app.post("/api/register", async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        console.log(registeredUser)
        res.status(200).send(`Registered ${registeredUser.username} successfully`)
        //res.send(registeredUser)
    } catch (e) {
        //req.flash('error', e.message)
        console.log(e)
        res.status(400).send("Invalid registration. User already exists.")
    }
})

app.post("/api/login", passport.authenticate('local', {keepSessionInfo: true}), async (req: Request, res: Response) => {
    if (req.isAuthenticated()){
        console.log('req.session in login: ', req.session)
        res.status(200).json({isAuthenticated: req.isAuthenticated(), user: req.user });
        //res.json({isAuthenticated: req.isAuthenticated(), user: req.user });
    }
    else {
        res.status(400)
    }
})
app.get('/logout', (req: Request, res: Response) => {
    req.logout();
    res.json({ message: 'Logged out' });
});

app.listen(8000, () => {
    console.log("Server started on port 8000")
})