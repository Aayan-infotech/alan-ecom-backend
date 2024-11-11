const mongoose = require('mongoose')

const personalDetailsSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zipCode:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model("personal details", personalDetailsSchema);