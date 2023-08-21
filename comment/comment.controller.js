const express = require('express');
const router = express.Router();
const Jwt = require('../jwt.guard');
const CommentService = require('./comment.service');

let commentService = new CommentService();
let jwt = new Jwt();

router.post('/get/dashboard',jwt.jwtValidate, async (req, res) => {
    try {
        res.send(await commentService.findByArrId(req.body.idList));
    } catch (error) {
        res.send(error);
    }
})

router.post('/create',jwt.jwtValidate, async (req, res) => {
    try {
        let userInfo = await jwt.jwtGetUser(req);
        req.body.commentData.username = userInfo.username
        res.send(await commentService.create(req.body.dashboardId,req.body.commentData));
    } catch (error) {
        console.log(error)
        res.send(error);

    }
})

module.exports = router;