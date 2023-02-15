const jwt = require("jsonwebtoken");
const secret = "Cafe-Login";

const verifyToken = (req,res,next)=>{
    //const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!req.headers.authorization){
        return res.status(403).send("A token is required for authentication");
    }
    const token = req.headers.authorization.split(' ')[1]
    try{
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
    }catch (err) {
        return res.status(401).send("Invalid Token");
      }
    return next();
}

module.exports = verifyToken;