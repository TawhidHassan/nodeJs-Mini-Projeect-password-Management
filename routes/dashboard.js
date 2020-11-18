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

router.get('/',checkLoginUser, function(req, res, next) {
    var user=localStorage.getItem('loginUser');
    res.render('dashbord', { title: 'Password Managment System',msg:'',loginUser:user });
  });
  
module.exports = router;