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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var Image = require('./models/image');
var Comment = require('./models/comment');
var bodyParser = require('body-parser');
var dbUrl = process.env.DB_URL;
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var flash = require('express-flash');
//mongoose.connect('mongodb://localhost:27017/image-uploader')
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Database connected");
});
var sessionConfig = {
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
app.get("/", function (req, res) {
    res.send("museum server online");
});
app.post("/api", function (req, res) {
    console.log('api/upload req.body: ', req.body);
    var image = new Image({
        imageLink: req.body.imageLink,
        label: req.body.label,
        author: req.body.author,
        comments: req.body.comments
    });
    image.save();
    res.status(200).send("received ".concat(req.body));
});
app.post("/api/checkAuth", passport.authenticate('local', { keepSessionInfo: true }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('req.session in checkauth: ', req.session);
        res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
        return [2 /*return*/];
    });
}); });
app.get("/api", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Image.find({})];
            case 1:
                images = _a.sent();
                res.json(images);
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Image.findById(id)];
            case 1:
                image = _a.sent();
                res.json(image);
                return [2 /*return*/];
        }
    });
}); });
app.put("/api/comments/:id", passport.authenticate('local', { keepSessionInfo: true }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, image, comment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.isAuthenticated()) return [3 /*break*/, 3];
                id = req.params.id;
                return [4 /*yield*/, Image.findById(id)
                    //const comment = new Comment({content: req.body.comment, author: req.body.author})
                ];
            case 1:
                image = _a.sent();
                comment = { content: req.body.content, author: req.body.username, time: req.body.time };
                if (req.body.author == "") {
                    comment.author = "Anonymous";
                }
                image.comments.push(comment);
                //await comment.save()
                return [4 /*yield*/, image.save()];
            case 2:
                //await comment.save()
                _a.sent();
                res.status(200).send("edited ".concat(id));
                return [3 /*break*/, 4];
            case 3:
                res.status(400);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put("/api/:id", passport.authenticate('local', { keepSessionInfo: true }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.isAuthenticated()) return [3 /*break*/, 2];
                id = req.params.id;
                return [4 /*yield*/, Image.findByIdAndUpdate(id, { label: req.body.label })];
            case 1:
                _a.sent();
                res.status(200).send("edited ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                res.status(400);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.patch("/api/comments/:id", passport.authenticate('local', { keepSessionInfo: true }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.isAuthenticated()) return [3 /*break*/, 3];
                id = req.params.id;
                return [4 /*yield*/, Image.findById(id)];
            case 1:
                image = _a.sent();
                image.comments.splice(req.body.commentIndex, 1);
                console.log(id, req.body);
                return [4 /*yield*/, image.save()];
            case 2:
                _a.sent();
                res.status(200).send("edited ".concat(id));
                return [3 /*break*/, 4];
            case 3:
                res.status(400);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/api/login", passport.authenticate('local', { keepSessionInfo: true }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.isAuthenticated()) {
            console.log('req.session in login: ', req.session);
            res.status(200).json({ isAuthenticated: req.isAuthenticated(), user: req.user });
            //res.json({isAuthenticated: req.isAuthenticated(), user: req.user });
        }
        else {
            res.status(400);
        }
        return [2 /*return*/];
    });
}); });
app.post("/api/:id", passport.authenticate('local', { keepSessionInfo: true }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.isAuthenticated()) return [3 /*break*/, 2];
                id = req.params.id;
                console.log(req.user);
                return [4 /*yield*/, Image.findByIdAndDelete(id)];
            case 1:
                _a.sent();
                res.status(200).send("Deleted ".concat(id, " successfully"));
                return [3 /*break*/, 3];
            case 2:
                res.status(400);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/api/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, password, user, registeredUser, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, username = _a.username, password = _a.password;
                user = new User({ email: email, username: username });
                return [4 /*yield*/, User.register(user, password)];
            case 1:
                registeredUser = _b.sent();
                console.log(registeredUser);
                res.status(200).send("Registered ".concat(registeredUser.username, " successfully"));
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                //req.flash('error', e.message)
                console.log(e_1);
                res.status(400).send("Invalid registration. User already exists.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/logout', function (req, res) {
    req.logout();
    res.json({ message: 'Logged out' });
});
app.listen(8000, function () {
    console.log("Server started on port 8000");
});
