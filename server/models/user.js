const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    contact: { 
        type: Number,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        },
        required: "Contact is required",
        unique: true
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    address: {
        type: String,
    },
    upi_id: {
        type: String,
        validate: {
            validator: function(v) {
                return /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/.test(v);
            },
            message: "{VALUE} is not a valid UPID ID"
        },
        required: "UPI ID is required",
        unique: true
    },
    image: {
            url: String, 
            fileName: String  
    },
    udhari_to_pay: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        amount: {
            type: Number
        }
    }],
    udhari_to_get: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        amount: {
            type: Number
        }
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);