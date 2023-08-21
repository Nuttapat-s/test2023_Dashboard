const jwt = require("jsonwebtoken")
const axios = require('axios').default;

class JwtValidation{
    jwtValidate = (req, res,next) => {
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
                next()
            })

    
        } catch (error) {
            return res.sendStatus(403)
        }
    }
    
    jwtGetUser = (req) => {
        try {
    
            const token = req.headers.authorization.replace("Bearer ", "")
    
            return jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err)
                    throw new Error(error);
                }
                return decoded;
            })
    
        } catch (error) {
            return new Error('verify error')
        }
    }
    
    jwtValidateRefreshToken = (refresh, res) => {
        try {
    
            const token = refresh;
    
            return jwt.verify(token, process.env.AUTH_REFRESH_TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    throw new Error(error);
                }
                if(Date.now() >= decoded.exp * 1000){
                    throw new new Error('All Token Expires Please Login Again')
                }else{
                    return await axios.post(`${process.env.AUTH_URL}/refresh`,{refreshToken:refresh}).then((data) => {
                        return data
                    }).catch((err) =>{
                        throw err;
                    })
                }
            })
    
        } catch (error) {
            return res.send(error)
        }
    }
}



module.exports = JwtValidation;
