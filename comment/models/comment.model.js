const mongoose = require('mongoose')

const Comment = new mongoose.Schema({
    username: String,
    detail:String,
    createAt: {type:Date,default:Date.now},
    updateAt: {type:Date,default:Date.now}
})

module.exports = mongoose.model('Comment',Comment)