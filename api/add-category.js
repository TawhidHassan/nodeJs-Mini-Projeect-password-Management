var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var session = require('express-session')
var passModel = require('../modules/password');
var userModule=require('../modules/user');
var passCatModel = require('../modules/passwordCategory');

var getPassCat=passCatModel.find({},{'passord_category':1,'_id':1});
const categoryControoler=require('./controller/category')
//for middelware
var checkAuth=require('./middleware/auth');

router.get("/getCAtegory",categoryControoler.getCategory);


router.post("/add-category",categoryControoler.addcategory);



router.put("/add-update-category/:id",categoryControoler.addAndUpdateCategory);


router.patch("/update-category/:id",categoryControoler.updateCategory);




router.delete("/add-delte-category/:id",categoryControoler.deleteCategory);

///////////////=====================================================================================================================================
////////////////=====================================================================================================================================

//add password
router.post("/add-new-password",function(req,res,next){

    var pass_cat=req.body.pass_cat;
    var pass_details=req.body.pass_details;
    var project_name=req.body.project_name;

    var passDetail=new passModel({
        password_category:pass_cat,
       project_name:project_name,
       password_detail:pass_details
    });
    // passCatDetail.save(function(err,doc){
    //     if(err)throw err;
    //     res.send("success---Nodejs restFull Api POST method Working");
        
    // }) 
    passDetail.save()
    .then(doc=>{
        res.status(201).json({
            messege:"password saved successfully",
            result:doc
        });
    })
    .catch(err=>{
         res.json(err);
    });

});

//password get
router.get("/getAllPasswords",function(req,res,next){
    passModel.find()
    .select("_id password_category project_name password_detail")
    .populate("password_category", "passord_category")
    .exec(function(err,data){
        if(err) throw err;
        res.status(200).json({
            messege:"Success",
            result:data
        });
      });
   
});

module.exports=router;