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
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid Email ID'
        },
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
    entries: [{
        name: {
            type: String,
            required: true,
            unique: true
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
            unqiue: true
        },
        personalDetails: {
            contact: { 
                type: Number,
                validate: {
                    validator: function(v) {
                        return /^[0-9]{10}$/.test(v);
                    },
                    message: '{VALUE} is not a valid 10 digit number!'
                }
            },
            email: {
                type: String,
                validate: {
                    validator: function(v) {
                        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                    },
                    message: '{VALUE} is not a valid Email ID'
                }
            },
            address: String
        },
        udhari: {
            status: {
                type: String,
                enum: ["Udhari_to_pay", "Udhari_to_get"],
                required: true
            },
            amount: {
                type: Number,
                min: 0,
                required: true
            }
        }
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);