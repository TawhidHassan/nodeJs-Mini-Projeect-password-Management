
var jwt = require('jsonwebtoken');
require('dotenv').config()  
var  key=process.env.SECRECT_KEY;

module.exports=(req,res,next)=>{
    // var headerToken=req.headers;
    // console.log(headerToken);
    try{
        // var token=req.body.token.split(" ")[1];
        var token=req.headers.authorization.split(" ")[1];//if used header
        var decode=jwt.verify(token,key);
        req.userData=decode;
        // console.log(token);
        next();
    }catch(error){
        res.status(401).json({
            error:"invalid token"
        });;
    }
    
}