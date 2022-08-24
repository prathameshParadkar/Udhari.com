const express = require("express");
const app = express();
const session = require('express-session');
// const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const mongoose = require("mongoose");
const User = require("./models/user")
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/udhari", {
    useNewUrlParser: true, useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error!"));
db.once('open', () => {
    console.log("Database connected!");
});

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// app.use(flash())

const sessionOptions = { 
    name: "session",
    secret: "Mysecret", 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionOptions));
// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.json('Invalid Username or Password'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send(user);
        });
    })(req, res);
})

app.post('/register', async (req, res, next) => {
    try{
        console.log(req.body);
        const {username, contact, email, upi_id, password} = req.body;
        const user = new User({username, contact, email, upi_id});
        console.log(user);
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if(err){return next(err)}
            res.send(registerUser);
        })
    }catch(e){
        console.log(e);
        next(e);
    }
})

app.use((err, req, res, next) => {
    if(err.code && err.code == 11000){
        const field = Object.keys(err.keyValue);
        const code = 409;
        res.status(code).send(`An account with that ${field} already exists.`);
    }
    if(err.name === 'ValidationError'){

    }
    const status = err.code || 500;
    const message = err.message || "Something went Wrong!";
    res.status(status).send(message);
})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})