const express = require("express");
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const mongoose = require("mongoose");
const User = require("./models/user")
const cors = require("cors");
const {validateData} = require("./middleware");

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

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/:username', async(req, res) => {
    const user = await User.findByUsername(req.params.username);
    console.log(user);
    res.send(user.entries);
})

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

app.put('/:username/udhari_to_pay', validateData, async (req, res, next) => {
    try{
        if(!req.params.username){
            res.send("You have been logged out!");
        }else {
            const {username, contact, email, upi_id, amount} = req.body;
            const currentUser = await User.findByUsername(req.params.username);
            await currentUser.updateOne({$push: {
                entries: {name: username, upi_id: upi_id, 
                personalDetails: {contact: contact, email: email}, 
                udhari: {status: "Udhari_to_pay", amount: amount}}}}, function(err){
                    if(err){next(err)}
                    return res.send("Added to db");
                })
        }
    }catch(e){
        console.log(e);
    }
})

app.put('/:username/udhari_to_get', validateData, async (req, res, next) => {
    try{
        if(!req.params.username){
            res.send("You have been logged out!");
        }else {
            const {username, contact, email, upi_id, amount} = req.body;
            const foundUser = await User.findByUsername(username);
            if(foundUser){
                console.log(foundUser);
            }
            const currentUser = await User.findByUsername(req.params.username);
            await currentUser.updateOne({$push: {
                entries: {name: username, upi_id: upi_id, 
                personalDetails: {contact: contact, email: email}, 
                udhari: {status: "Udhari_to_get", amount: amount}}}}, function(err){
                    if(err){next(err)}
                    return res.send("Added to db");
                })
        }
    }catch(e){
        console.log(e);
    }
})


app.use((err, req, res, next) => {
    if(err.code && err.code === 11000){
        const field = Object.keys(err.keyValue);
        const code = 409;
        res.status(code).send(`An account with that ${field} already exists.`);
    }
    const status = err.code || 500;
    const message = err.message || "Something went Wrong!";
    res.status(status).send(message);
})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})