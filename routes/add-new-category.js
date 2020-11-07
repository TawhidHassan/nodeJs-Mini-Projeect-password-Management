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

router.get('/', checkLoginUser,function(req, res, next) {
    var user=localStorage.getItem('loginUser');
    res.render('addNewCategory', { title: 'Password Management System', msg:'',loginUser:user,errors:'',success:'' });
  });
  

  
router.post('/', checkLoginUser,[check('passwordCategory',"Enter Password Category Name").isLength({min:1})],function(req, res, next) {
    var user=localStorage.getItem('loginUser');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.mapped())
      return res.render('addNewCategory', { title: 'Password Management System',loginUser:user,errors: errors.mapped(),success:''});
    }else{
  
      var passCatName=req.body.passwordCategory;
      var passcatDetaild=new passCatModel({
        passord_category:passCatName
      });
  
      passcatDetaild.save(function(err,doc){
          if(err) throw err;
          res.render('addNewCategory', { title: 'Password Management System',loginUser:user,errors:'',success:'Category Saved' });
      }); 
    }
  });

module.exports = router;