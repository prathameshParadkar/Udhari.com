const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        required: true,
        default: Date.now()
    }
})