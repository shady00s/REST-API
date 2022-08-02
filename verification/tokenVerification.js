const jwt = require("jsonwebtoken")

function userVerifyToken(req,res,next){
    const token = req.header('user-token')
    // check if token is available 
    if(!token){
        res.status(401).json({
            message:"token not found ,access denied"
        })
    }
    else{
        try{
            const verifiedToken = jwt.verify(token,process.env.CLIENT_TOKEN_SECRET)

            req.user = verifiedToken 
            next()
        }catch(e){
            res.status(401).json({
                message:"invalid token"
            })
        }
    }
}


function sellerVerifyToken(req,res,next){
    const token = req.header('seller-token')

    // check if token is available 
  
    if(!token){
        res.status(401).json({
            message:"token not found ,access denied"
        })
    }
    else{
        try{
            const sellerVerifiedToken = jwt.verify(token, process.env.SELLER_TOKEN_SECRET)

            req.seller = sellerVerifiedToken 
            next()
        }catch(e){
            res.status(401).json({
                message:"invalid token"
            })
        }
    }
}


module.exports = {userVerifyToken ,sellerVerifyToken}