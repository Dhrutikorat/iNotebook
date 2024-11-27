const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    //get the user from jwt token and add it to request 
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        var payload = jwt.verify(token, process.env.JWT_SIGN);
        req.user = payload.user
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser