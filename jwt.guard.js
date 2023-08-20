const jwt = require("jsonwebtoken")

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
        })

    } catch (error) {
        return res.sendStatus(403)
    }
}

module.exports = jwtValidate;