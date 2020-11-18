const { fileLoader } = require('ejs');
const e = require('express');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var passModel = require('../modules/password');
var userModule=require('../modules/user');
var passCatModel = require('../modules/passwordCategory');
var session = require('express-session')
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

//check login user
function checkLoginUser(req,res,next){
  var userToken=localStorage.getItem('userToken');
  try {
    if(req.session.userName){
      var decoded = jwt.verify(userToken, 'loginToken');
    }else{
      res.redirect('/');
    }
  } catch(err) {
    res.redirect('/');
  }
  next();
}


router.get('/', checkLoginUser,function(req, res, next) {
    var user=localStorage.getItem('loginUser');
    getPassCat.exec(function(err,data){
  
      if(err) throw err;
      res.render('password_category', { title: 'Password Management System', msg:'',loginUser:user,records:data  });
    });
    
  });
  
  



  router.get('/delete/:id', checkLoginUser,function(req, res, next) {
    var user=localStorage.getItem('loginUser');
    var passcat_id=req.params.id;
    var passdelete=passCatModel.findByIdAndDelete(passcat_id);
    passdelete.exec(function(err){
      if(err) throw err;
      res.redirect('/passwordCategory');
    });
  });
  
  
  router.get('/edit/:id', checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var passcat_id=req.params.id;
    var getpassCategory=passCatModel.findById(passcat_id);
    getpassCategory.exec(function(err,data){
      if(err) throw err;
   
      res.render('edit_pass_category', { title: 'Password Management System',loginUser: loginUser,errors:'',success:'',records:data,id:passcat_id});
  
    });
  });
  
  router.post('/edit/', checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var passcat_id=req.body.id;
    var passwordCategory=req.body.passwordCategory;
   var update_passCat= passCatModel.findByIdAndUpdate(passcat_id,{passord_category:passwordCategory});
   update_passCat.exec(function(err,doc){
      if(err) throw err;
   
  res.redirect('/passwordCategory');
    });
  });
  



module.exports = router;