const { fileLoader } = require('ejs');
const e = require('express');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var session = require('express-session')
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
      res.render('add-new-password', { title: 'Password Management System', msg:'',loginUser:user,records: data,success:'' });
    });
    
  });
  
  
  router.post('/', checkLoginUser,function(req, res, next) {
    var user=localStorage.getItem('loginUser');
    var pass_cat=req.body.pass_cat;
    var pass_details=req.body.pass_details;
    var project_name=req.body.project_name;
  
  var passDetails=new passModel({
    password_category:pass_cat,
    project_name:project_name,
    password_detail:pass_details
  
  });
  passDetails.save(function(err,data){
    if(err)throw err;
    getPassCat.exec(function(err,data){
      if(err) throw err;
      res.render('add-new-password', { title: 'Password Management System', msg:'',loginUser:user,records: data,success:"password save sucessfully" });
    });
  });
    
  });
  
module.exports = router;