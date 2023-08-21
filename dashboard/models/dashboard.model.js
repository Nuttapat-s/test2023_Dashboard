const mongoose = require('mongoose')

const Dashboard = new mongoose.Schema({
    userId: String,
    headerDetail: String,
    Detail: String,
    status: String,
    createBy: String,
    userEmail: String,
    commentId:[String],
    createAt: {type:Date,default:Date.now},
    updateAt: {type:Date,default:Date.now}
})

module.exports = mongoose.model('Dashboard',Dashboard)