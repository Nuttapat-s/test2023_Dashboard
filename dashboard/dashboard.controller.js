const express = require('express');
const router = express.Router();

router.post('/',(req,res) => {
    res.send({name:'name'})
})

module.exports = router;