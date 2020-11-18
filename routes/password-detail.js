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




router.get('/edit/:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var id =req.params.id;
    var getPassDetails=passModel.findById({_id:id});
      getPassDetails.exec(function(err,data){
      if(err) throw err;
      getPassCat.exec(function(err,data1){
      res.render('edit_password_detail', { title: 'Password Management System',loginUser: loginUser,records:data1,record:data,success:'' });
      });
    });
  });
  
  router.post('/edit/:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var id =req.params.id;
    var passcat= req.body.pass_cat;
    var project_name= req.body.project_name;
    var pass_details= req.body.pass_details;
    passModel.findByIdAndUpdate(id,{password_category:passcat,project_name:project_name,password_detail:pass_details}).exec(function(err){
    if(err) throw err;
      var getPassDetails=passModel.findById({_id:id});
    getPassDetails.exec(function(err,data){
      if(err) throw err;
        getPassCat.exec(function(err,data1){
        res.render('edit_password_detail', { title: 'Password Management System',loginUser: loginUser,records:data1,record:data,success:'Password Updated Successfully' });
        });
      });
    });
  });
  
  router.get('/delete/:id', checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var id =req.params.id;
    var passdelete=passModel.findByIdAndDelete(id);
    passdelete.exec(function(err){
      if(err) throw err;
      res.redirect('/view-all-password/');
    });
  });
  
  
  
module.exports = router;