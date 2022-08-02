const jwt = require("jsonwebtoken")

module.exports = function (req,res,next){
    const token = req.header('user-token')
    // check if token is available 
    if(!token){
        res.status(401).json({
            message:"token not found ,access denied"
        })
    }
    else{
        try{
            const verifiedToken = jwt.verify(token,process.env.TOKEN_SECRET)

            req.user = verifiedToken 
            next()
        }catch(e){
            res.status(401).json({
                message:"invalid token"
            })
        }
    }
}