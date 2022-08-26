const User = require("../models/user");
const passport = require("passport");

module.exports.loginUser = (req, res, next) => {
    passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.json('Invalid Username or Password'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send(user);
        });
    })(req, res);
}

module.exports.registerUser = async (req, res, next) => {
    try{
        // console.log(req.body);
        const {username, contact, email, upi_id, password} = req.body;
        const user = new User({username, contact, email, upi_id});
        // console.log(user);
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if(err){return next(err)}
            res.send(registerUser);
        })
    }catch(e){
        // console.log(e);
        next(e);
    }
}