const { fileLoader } = require('ejs');
const e = require('express');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var passModel = require('../modules/password');
var userModule=require('../modules/user');
var passCatModel = require('../modules/passwordCategory');

var jwt = require('jsonwebtoken');
const { Router } = require('express');
//for validation
const { check, validationResult } = require('express-validator');

var getPassCat=passCatModel.find({});
var getAllPass=passModel.find({});


//local storage for JWT
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}



///==============================user Login===================================================/////////////////////////

//check login user
function checkLoginUser(req,res,next){
  var userToken=localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(userToken, 'loginToken');
  } catch(err) {
    res.redirect('/');
  }
  next();
}



/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  if(loginUser){
    res.redirect('./dashboard');
  }else{
  res.render('index', { title: 'Password Management System', msg:'' });
  }
});

//login post methods call
router.post('/', function(req, res, next) {
  var username=req.body.uname;
  var password=req.body.password;
  var checkUser=userModule.findOne({username:username});
  checkUser.exec((err, data)=>{
   if(data==null){
    res.render('index', { title: 'Password Management System', msg:"user not eixt" });

   }else{
      if(err) throw err;
      var getUserID=data._id;
      var getPassword=data.password;
      if(bcrypt.compareSync(password,getPassword)){
        var token = jwt.sign({ userID: getUserID }, 'loginToken');
        localStorage.setItem('userToken', token);
        localStorage.setItem('loginUser', username);
        res.redirect('/dashboard');
        // res.render('index', { title: 'Password Management System', msg:"done." });
      }else{
        res.render('index', { title: 'Password Management System', msg:"Invalid Username and Password." });

    }
   }
  });
 
});


///==============================user Login===================================================/////////////////////////

///************************************************************************************************************************** /////

///==============================user signup===================================================/////////////////////////
//midel ware check email not duplicate//
function checkUsername(req,res,next){
  var uname=req.body.uname;
  var checkexitemail=userModule.findOne({username:uname});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
   return res.render('signup', { title: 'Password Management System', msg:'Username Already Exit' });
 }
 next();
  });
}
//midel ware check email not duplicate//
//--------------------------------------------------------------------------------------------------
//midel ware check name not duplicate//
function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=userModule.findOne({email:email});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  return res.render('signup', { title: 'Password Management System', msg:'Email Already Exit' });
 }
 next();
  });
}
//midel ware check name not duplicate//

router.get('/signup', function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  if(loginUser){
    res.redirect('./dashboard');
  }else{
  res.render('signup', { title: 'Password Management System', msg:'' });
  }
});
router.post('/signup',checkUsername,checkEmail,function(req, res, next) {
  var username=req.body.uname;
  var email=req.body.email;
  var password=req.body.password;
  var confpassword=req.body.confpassword;
if(password !=confpassword){
res.render('signup', { title: 'Password Management System', msg:'Password not matched!' });

}else{
password =bcrypt.hashSync(req.body.password,10);
  var userDetails=new userModule({
    username:username,
    email:email,
    password:password
  });
userDetails.save((err,doc)=>{
  if(err) throw err;
  res.render('signup', { title: 'Password Management System', msg:'User Registerd Successfully' });
})  ;
} 


});
///==============================user signup===================================================/////////////////////////

///=========================== LogOut====================================================================//////////////////////////
router.get('/logout', function(req, res, next) {
  localStorage.removeItem('userToken');
  localStorage.removeItem('loginUser');
  res.redirect('/');
});
///=============================== LogOut =====================================================================////////////////////

module.exports = router;
