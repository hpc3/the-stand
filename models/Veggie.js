const mongoose = require('mongoose');


const VeggieSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:  true 
    },
    dateLastStocked:{
        type: Date,
        default: Date.now
    },
    quantity:{
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('veggies', VeggieSchema);