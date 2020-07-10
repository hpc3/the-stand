const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comments', CommentSchema);