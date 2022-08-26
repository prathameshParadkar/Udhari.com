const User = require("../models/user")

module.exports.userData = async (req, res) => {
    const user = await User.findByUsername(req.params.username);
    // console.log(user);
    if(!user){
        res.send(false);
    }
    res.send(user);
}

module.exports.udhariToPay = async (req, res) => {
    try{
        if(!req.params.username){
            return res.send("You have been logged out!");
        }else {
            const {username, contact, email, upi_id, amount} = req.body;
            const currentUser = await User.findOneAndUpdate({username: req.params.username}, {$push: {
                                entries: {name: username, upi_id: upi_id, 
                                personalDetails: {contact: contact, email: email}, 
                                udhari: {status: "Udhari_to_pay", amount: amount}}}}, {returnOriginal: false, returnDocument: "after"})
            
            const foundUser = await User.findByUsername(username);
            // console.log(foundUser);
            if(foundUser){
                    foundUser.updateOne({$push: {
                            entries: {name: currentUser.username, upi_id: currentUser.upi_id, 
                            personalDetails: {contact: currentUser.contact, email: currentUser.email}, 
                            udhari: {status: "Udhari_to_get", amount: amount}}}}, {returnOriginal: false, returnDocument: "after"}, function(err){
                                if(err){console.log(err)}
                                    // console.log(foundUser);
                                    return res.send(currentUser.entries.slice(-1));
                            })
            }else {
                res.send(currentUser.entries.slice(-1));
            }
        }
    }catch(e){
        console.log(e);
    }
}

module.exports.udhariToGet = async (req, res) => {
    try{
        if(!req.params.username){
            res.send("You have been logged out!");
        }else {
            const {username, contact, email, upi_id, amount} = req.body;
            const currentUser = await User.findOneAndUpdate({username: req.params.username}, {$push: {
                                entries: {name: username, upi_id: upi_id, 
                                personalDetails: {contact: contact, email: email}, 
                                udhari: {status: "Udhari_to_get", amount: amount}}}}, {returnOriginal: false, returnDocument: "after"})
            const foundUser = await User.findByUsername(username);
            // console.log(foundUser);
            if(foundUser){
                    foundUser.updateOne({$push: {
                            entries: {name: currentUser.username, upi_id: currentUser.upi_id, 
                            personalDetails: {contact: currentUser.contact, email: currentUser.email}, 
                            udhari: {status: "Udhari_to_pay", amount: amount}}}}, {returnOriginal: false, returnDocument: "after"}, function(err){
                                if(err){console.log(err)}
                                    // console.log(foundUser);
                                    return res.send(currentUser.entries.slice(-1));
                            })
            }else {
                res.send(currentUser.entries.slice(-1));
            }
            
        }
    }catch(e){
        console.log(e);
    }
}

module.exports.manageUdhari = (req, res) => {
    User.findOne({username: req.params.username, "entries.name":  req.body.name})
        .then(doc => {
            const entry = doc.entries.find(val => val.name === req.body.name);
            if(entry.udhari.status === req.body.status){
                entry.udhari.amount += req.body.amount;
            }else{

            }
            doc.save();
            res.send(entry);
        })
        .catch(err => {
            res.send(err);
        })
}

module.exports.removeUdhari = async (req, res) => {
    try{
        if(!req.params.username){
            res.send("You have been logged out!");
        }else {
            await User.findOneAndUpdate({username: req.params.username}, {$pull: {
                    entries: {name: req.body.name}
                }}, {returnOriginal: false, returnDocument: "after"})
            res.send("Removed");
        }
    }catch(e){
        console.log(e);
    }
}