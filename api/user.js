var express = require('express');
var router = express.Router();
module.exports = router;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var userModule=require('../modules/user');
var session = require('express-session')

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

router.post('/login',function(req, res,next){
    var username=req.body.uname;
  var password=req.body.password;
  var checkUser=userModule.findOne({username:username});

    checkUser.exec()
    .then(user=>{
        var getPassword=user.password;
        var getUserName=user.username;
        var getUserID=user._id;
        if(bcrypt.compareSync(password,getPassword)){
          var token=jwt.sign({ username:getUserName,userID: getUserID   }, 'secret',{expiresIn:"1h"});
            res.status(201).json({
                message:"ok signup",
                results:user,
                token:token
            });
          
        }else{
            res.status(404).json({
                message:"Auth failed",
            });
      }
    })
    .catch(err=>{
        res.json({
            message:err
        });
    });
    
      
});