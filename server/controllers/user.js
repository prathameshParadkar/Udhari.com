const User = require("../models/user")

module.exports.userData = async (req, res) => {
    const user = await User.findByUsername(req.params.username);
    // console.log(user);
    if(!user){
        return res.send(false);
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

const toggleStatus = (status) => {
    if(status === "Udhari_to_pay"){
        return "Udhari_to_get";
    }else {
        return "Udhari_to_pay";
    }
}

module.exports.manageUdhari =  (req, res) => {
    User.findOne({username: req.params.username, "entries.name":  req.body.name})
        .then( async (doc) => {
            const entry = doc.entries.find(val => val.name === req.body.name);
            const foundUser = await User.findOne({username: req.body.name});
            let result= {removedFromUser: false};
            if(foundUser){
                const foundEntry = foundUser.entries.find(val => val.name === req.params.username);
                if(foundEntry.udhari.status !== req.body.status){
                    foundEntry.udhari.amount += req.body.amount;
                }
                else{
                    if(req.body.amount>foundEntry.udhari.amount){
                        foundEntry.udhari.status = toggleStatus(foundEntry.udhari.status);
                        foundEntry.udhari.amount = req.body.amount - foundEntry.udhari.amount;
                    }else if(req.body.amount<foundEntry.udhari.amount){
                        foundEntry.udhari.amount -= req.body.amount;
                    }else {
                        foundUser.entries.remove(foundEntry);
                    }
                }
                result.foundEntry = foundEntry;
                foundUser.save();
            }
            if(entry.udhari.status === req.body.status){
                entry.udhari.amount += req.body.amount;
            }else{
                if(req.body.amount>entry.udhari.amount){
                    entry.udhari.status = toggleStatus(entry.udhari.status);
                    entry.udhari.amount = req.body.amount - entry.udhari.amount;
                }else if(req.body.amount<entry.udhari.amount){
                    entry.udhari.amount -= req.body.amount;
                }else {
                    doc.entries.remove(entry);
                    result.removedFromUser = true;
                }
            }
            doc.save();
            res.send({"result": result, "entry": entry});
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