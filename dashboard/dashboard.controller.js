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
        res.send(error);
    }

})

router.get('/detail/:id',jwt.jwtValidate,async (req,res)=>{
    try {
        console.log(req.params.id)
        res.send(await service.viewDetail(req.params.id))
    } catch (error) {
        console.log(error)
        res.send(error);
        
    }
})

router.post('/new/token',async  (req, res) => {
    try {
       let data =await jwt.jwtValidateRefreshToken(req.body.refreshToken)
       res.send(data)
    } catch (error) {
        res.send(error);
    }
    
})

router.post('/create',jwt.jwtValidate,async (req,res) =>{
    try {
        let userInfo = await jwt.jwtGetUser(req);
        req.body.userId = userInfo.id
        req.body.createBy = userInfo.username
        req.body.userEmail = userInfo.email
        let data = await service.createDashboard(req.body)
        res.send(data);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})

router.delete('/delete/one',jwt.jwtValidate,async (req,res) =>{
    try {
        res.send(await service.deleteData(req.body.id));
    } catch (error) {
        res.send(error);
    }
})

router.put('/status',jwt.jwtValidate,async (req,res) =>{
    try {
        res.send(await service.updateStatus(req.body.id,req.body.status))
    } catch (error) {
        res.send(error);
    }
})

router.get('/status/dropdown',jwt.jwtValidate,async (req,res) =>{
    try {
        res.send({
            dropdown:['To Do','In Progress','Done']
        })
    } catch (error) {
        res.send(error);
    }
})


module.exports = router;