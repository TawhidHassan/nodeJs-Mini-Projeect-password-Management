var express = require('express');
var router = express.Router();
module.exports = router;
var bcrypt = require('bcryptjs');

var userModule=require('../modules/user');


router.get("/",function(req,res,next){

    res.json({
        message:"success"
    });
});


router.post('/signup',function(req, res,next){
    var username=req.body.uname;
  var email=req.body.email;
  var password=req.body.password;
  var confpassword=req.body.confpassword;
    
  if(password !=confpassword){
    res.json({
        message:"Password not matched!"
    });
    }else{
    password =bcrypt.hashSync(req.body.password,10);
        
    var userDetails=new userModule({
        username:username,
        email:email,
        password:password
        });
    

        userDetails.save()
    .then(doc=>{
        res.status(201).json({
            message:"ok signup",
            results:doc
        });
    })
    .catch(err=>{
            res.json(err);
    });
      
      
}

});