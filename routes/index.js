const e = require('express');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var userModule=require('../modules/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Password Managment System' });
});


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
  res.render('signup', { title: 'Password Management System', msg:'' });
});
router.post('/signup', checkUsername,checkEmail,function(req, res, next) {

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
      if(err)throw err;

      res.render('signup', { title: 'Password Management System', msg:'user signup Successfuilly' });
  });
  }
  
});

///==============================user signup===================================================/////////////////////////



router.get('/passwordCategory', function(req, res, next) {
  res.render('password_category', { title: 'Password Management System', msg:'' });
});
router.get('/add-new-category', function(req, res, next) {
  res.render('addNewCategory', { title: 'Password Management System', msg:'' });
});
router.get('/add-new-password', function(req, res, next) {
  res.render('add-new-password', { title: 'Password Management System', msg:'' });
});
router.get('/view-all-password', function(req, res, next) {
  res.render('view-all-password', { title: 'Password Management System', msg:'' });
});



module.exports = router;
