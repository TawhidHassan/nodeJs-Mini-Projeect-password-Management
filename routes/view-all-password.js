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


// router.get('/view-all-password', checkLoginUser,function(req, res, next) {
//   var user=localStorage.getItem('loginUser');

//   var perPage=4;
//   var page=req.params.page || 1;

//   getAllPass.skip((perPage*page)- perPage)
//   .limit(perPage).exec(function(err,data){
//     if(err)throw err;
//     passModel.countDocuments({}).exec((err,count)=>{
//     res.render('view-all-password', { title: 'Password Management System',
//      msg:'',
//      loginUser:user,
//      records: data,
//      current: page,
//      pages: Math.ceil(count / perPage) 
//     });
//   });
// });
// });


// router.get('/view-all-password/:page', checkLoginUser,function(req, res, next) {
//   var user=localStorage.getItem('loginUser');

//   var perPage=4;
//   var page=req.params.page || 1;

//   getAllPass.skip((perPage*page)- perPage)
//   .limit(perPage).exec(function(err,data){
//     if(err)throw err;
//     passModel.countDocuments({}).exec((err,count)=>{
//     res.render('view-all-password', { title: 'Password Management System',
//      msg:'',
//      loginUser:user,
//      records: data,
//      current: page,
//      pages: Math.ceil(count / perPage) 
//     });
//   });
// });
// });

///========with mongoose pagination plugin =====================///
router.get('/', checkLoginUser,function(req, res, next) {
    var user=localStorage.getItem('loginUser');
    var options = {
      offset:   1, 
      limit:    3
  };
   
  
    passModel.paginate({},options).then(function(data){
      res.render('view-all-password', { title: 'Password Management System',
       msg:'',
       loginUser:user,
       records: data.docs,
       current: data.offset,
       pages: Math.ceil( data.total/data.limit)
      });
    
  });
  });
  
  
  router.get('/:page', checkLoginUser,function(req, res, next) {
    var user=localStorage.getItem('loginUser');
  
    var perPage=4;
    var page=req.params.page || 1;
  
    getAllPass.skip((perPage*page)- perPage)
    .limit(perPage).exec(function(err,data){
      if(err)throw err;
      passModel.countDocuments({}).exec((err,count)=>{
      res.render('view-all-password', { title: 'Password Management System',
       msg:'',
       loginUser:user,
       records: data,
       current: page,
       pages: Math.ceil(count / perPage) 
      });
    });
  });
  });


  
module.exports = router;