const express = require('express');
const router = express.Router();
const DashboardService = require('./dashboard.service');
const JwtValidation = require('../jwt.guard');


let service = new DashboardService();
let jwt = new JwtValidation();

router.get('/',jwt.jwtValidate, async (req, res) => {
    try {
        let data = await service.findAll(req.query.limit, req.query.skip);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }

})

router.get('/detail',jwt.jwtValidate,async (req,res)=>{
    try {
        res.send(await service.viewDetail(req.body.id))
    } catch (error) {
        console.log(error)
        
    }
})

router.post('/new/token',async  (req, res) => {
    try {
       let data =await jwt.jwtValidateRefreshToken(req.body.refreshToken,res)
       res.send(data)
    } catch (error) {
        res.sendStatus(500);
    }
    
})

router.post('/create',jwt.jwtValidate,async (req,res) =>{
    try {
        console.log('asfddsa')
        let userInfo = await jwt.jwtGetUser(req);
        console.log(userInfo)
        req.body.userId = userInfo._id
        req.body.createBy = userInfo.username
        res.send(await service.createDashboard(req.body));
    } catch (error) {
        res.sendStatus(500);
    }
})

router.delete('/delete/one',jwt.jwtValidate,async (req,res) =>{
    try {
        res.send(await service.deleteData(req.body.id));
    } catch (error) {
        res.sendStatus(500);
    }
})


module.exports = router;