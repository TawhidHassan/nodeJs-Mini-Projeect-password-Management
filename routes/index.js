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

router.get('/dashboard',checkLoginUser, function(req, res, next) {
  var user=localStorage.getItem('loginUser');
  res.render('dashbord', { title: 'Password Managment System',msg:'',loginUser:user });
});


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


///////===============================  password category ==========================================///////////////////////

router.get('/add-new-category', checkLoginUser,function(req, res, next) {
  var user=localStorage.getItem('loginUser');
  res.render('addNewCategory', { title: 'Password Management System', msg:'',loginUser:user,errors:'',success:'' });
});

router.post('/add-new-category', checkLoginUser,[check('passwordCategory',"Enter Password Category Name").isLength({min:1})],function(req, res, next) {
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

router.get('/passwordCategory', checkLoginUser,function(req, res, next) {
  var user=localStorage.getItem('loginUser');
  getPassCat.exec(function(err,data){

    if(err) throw err;
    res.render('password_category', { title: 'Password Management System', msg:'',loginUser:user,records:data  });
  });
  
});


router.get('/passwordCategory/delete/:id', checkLoginUser,function(req, res, next) {
  var user=localStorage.getItem('loginUser');
  var passcat_id=req.params.id;
  var passdelete=passCatModel.findByIdAndDelete(passcat_id);
  passdelete.exec(function(err){
    if(err) throw err;
    res.redirect('/passwordCategory');
  });
});


router.get('/passwordCategory/edit/:id', checkLoginUser,function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  var passcat_id=req.params.id;
  var getpassCategory=passCatModel.findById(passcat_id);
  getpassCategory.exec(function(err,data){
    if(err) throw err;
 
    res.render('edit_pass_category', { title: 'Password Management System',loginUser: loginUser,errors:'',success:'',records:data,id:passcat_id});

  });
});

router.post('/passwordCategory/edit/', checkLoginUser,function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  var passcat_id=req.body.id;
  var passwordCategory=req.body.passwordCategory;
 var update_passCat= passCatModel.findByIdAndUpdate(passcat_id,{passord_category:passwordCategory});
 update_passCat.exec(function(err,doc){
    if(err) throw err;
 
res.redirect('/passwordCategory');
  });
});


///////===============================  password category ==========================================///////////////////////


///======================================  add Pasword ===============================================//////////////////////////

router.get('/add-new-password', checkLoginUser,function(req, res, next) {
  var user=localStorage.getItem('loginUser');
  getPassCat.exec(function(err,data){
    if(err) throw err;
    res.render('add-new-password', { title: 'Password Management System', msg:'',loginUser:user,records: data,success:'' });
  });
  
});

router.post('/add-new-password', checkLoginUser,function(req, res, next) {
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


router.get('/view-all-password', checkLoginUser,function(req, res, next) {
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


router.get('/view-all-password/:page', checkLoginUser,function(req, res, next) {
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


router.get('/password-detail/edit/:id',checkLoginUser, function(req, res, next) {
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

router.post('/password-detail/edit/:id',checkLoginUser, function(req, res, next) {
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

router.get('/password-detail/delete/:id', checkLoginUser,function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  var id =req.params.id;
  var passdelete=passModel.findByIdAndDelete(id);
  passdelete.exec(function(err){
    if(err) throw err;
    res.redirect('/view-all-password/');
  });
});



module.exports = router;
