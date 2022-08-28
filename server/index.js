const express = require("express");
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const User = require("./models/user")
// const dbUrl = process.env.DB_URL

//connecting db(MongoDB cloud services)
mongoose.connect("mongodb+srv://MalayPhadke:Malayp@cluster0.ilttwif.mongodb.net/?retryWrites=true&w=majority", {
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

//setting up session store
// const store = new MongoStore({
//     mongoUrl: dbUrl,
//     secret: "Mysecret",
//     touchAfter: 24*3600
// });

// store.on("error", function(e){
//     console.log("Session store error", e);
// })

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

//initializing and setting up passport(Local Strategy)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//getting routes
app.use('/', authRoutes);
app.use('/:username', userRoutes);

//error handling
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