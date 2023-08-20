const express = require('express');
const dashboardRouter = require('./dashboard/dashboard.controller')
const jwtValidate = require('./jwt.guard')
const dotenv = require('dotenv');

dotenv.config();

let app = express();

app.use('/dashboard',jwtValidate,dashboardRouter)

app.listen(process.env.PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.PORT);
});



