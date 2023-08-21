const express = require('express');
const router = express.Router();
const jwtValidate = require('./jwt.guard');
const DashboardService = require('./dashboard.service');

let service = new DashboardService();

router.get('/', async (req, res) => {
    try {
        let data = await service.findAll(req.query.limit, req.query.skip);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }

})

router.get('/detail',async (req,res)=>{
    try {
        res.send(await service.viewDetail(req.body.id))
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

router.post('/', jwtValidate, (req, res) => {
    res.send({ name: 'name' })
})

module.exports = router;