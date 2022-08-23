const express = require("express");
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
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
app.use(flash())

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
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.send("HomePage");
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

app.get('/home', (req, res) => {
    res.send('hello user');
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
            res.redirect('/home')
        })
    }catch(e){
        console.log(e);
        res.redirect('/')
    }
})
app.get('/failure', (req, res) => {
    res.send("Login Failed")
})

app.use((err, req, res, next) => {
    const {status=500} = err;
    if(!err.message) err.message = "Something went Wrong!";
    res.status(status).render('error', {err});
})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})