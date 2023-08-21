const express = require('express');
const dashboardRouter = require('./dashboard/dashboard.controller')
const commentRouter = require('./comment/comment.controller')
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('db connect success')
    })
    .catch((err) => console.log(err))

let app = express();

app.use('/dashboard',dashboardRouter)
app.use('/comment',commentRouter)

app.listen(process.env.PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.PORT);
});



