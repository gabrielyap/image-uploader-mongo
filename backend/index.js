"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Image = require('./models/image');
const bodyParser = require('body-parser');
const dbUrl = process.env.DB_URL;
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const flash = require('express-flash');
//mongoose.connect('mongodb://localhost:27017/image-uploader')
mongoose.connect(dbUrl);
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
};
app.use(passport.initialize());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Needed to parse urls
app.use(bodyParser.json());
app.use(flash());
app.use(session(sessionConfig));
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get("/", (req, res) => {
    res.send("museum server online");
});
app.post("/api", (req, res) => {
    //console.log('api/upload req.body: ', req.body)
    const image = new Image({
        imageLink: req.body.imageLink,
        label: req.body.label,
        author: req.body.author
    });
    image.save();
    res.status(200).send(`received ${req.body}`);
});
app.post("/api/checkAuth", passport.authenticate('local', { keepSessionInfo: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req.session in checkauth: ', req.session);
    res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
}));
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield Image.find({});
    res.json(images);
}));
app.get("/api/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const image = yield Image.findById(id);
    res.json(image);
}));
app.put("/api/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Image.findByIdAndUpdate(id, { label: req.body.label });
    res.status(200).send(`edited ${id}`);
}));
app.delete("/api/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Image.findByIdAndDelete(id);
    res.status(200).send(`Deleted ${id} successfully`);
}));
app.post("/api/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = yield User.register(user, password);
        console.log(registeredUser);
        res.status(200).send(`Registered ${registeredUser.username} successfully`);
        //res.send(registeredUser)
    }
    catch (e) {
        //req.flash('error', e.message)
        console.log(e);
        res.status(400).send("Invalid registration. User already exists.");
    }
}));
app.post("/api/login", passport.authenticate('local', { keepSessionInfo: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated()) {
        console.log('req.session in login: ', req.session);
        res.status(200).json({ isAuthenticated: req.isAuthenticated(), user: req.user });
        //res.json({isAuthenticated: req.isAuthenticated(), user: req.user });
    }
    else {
        res.status(400);
    }
}));
app.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logged out' });
});
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
