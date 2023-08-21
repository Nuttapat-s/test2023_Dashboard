const jwt = require("jsonwebtoken")
const axios = require('axios').default;

const jwtValidate = (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.sendStatus(401);
        }

        const token = req.headers.authorization.replace("Bearer ", "")

        jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw new Error(error);
            }
            if(Date.now() >= decoded.exp * 1000){
                throw new new Error('Token Expires')
            }
        })

    } catch (error) {
        return res.sendStatus(403)
    }
}

const jwtGetUser = (req) => {
    try {

        const token = req.headers.authorization.replace("Bearer ", "")

        return jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw new Error(error);
            }
            return decoded.id;
        })

    } catch (error) {
        return new Error('verify error')
    }
}

const jwtValidateRefreshToken = (refresh, res) => {
    try {

        const token = refresh;

        return jwt.verify(token, process.env.AUTH_REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw new Error(error);
            }
            if(Date.now() >= decoded.exp * 1000){
                throw new new Error('Token Expires')
            }else{
                console.log('sss')
                return 'xxx'
            }
        })

    } catch (error) {
        return res.sendStatus(403)
    }
}

module.exports = jwtValidate;
module.exports = jwtGetUser;