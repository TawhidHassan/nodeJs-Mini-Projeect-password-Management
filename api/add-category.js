var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var session = require('express-session')
var passModel = require('../modules/password');
var userModule=require('../modules/user');
var passCatModel = require('../modules/passwordCategory');

var getPassCat=passCatModel.find({},{'passord_category':1,'_id':0});

router.get("/getCAtegory",function(req,res,next){
    getPassCat.exec(function(err,data){
        if(err) throw err;
        // res.send("Nodejs restFull Api GET method Working"+data);
        res.send(data);
      });
   
});


router.post("/add-category",function(req,res,next){

    var passCategory=req.body.pass_cat;
    var passCatDetail=new passCatModel({passord_category:passCategory});
    passCatDetail.save(function(err,doc){
        if(err)throw err;
        res.send("success---Nodejs restFull Api POST method Working");
        
    }) 
});



router.put("/add-update-category",function(req,res,next){

    res.send("Nodejs restFull Api PUT method Working");
});
router.patch("/add-pach-category",function(req,res,next){

    res.send("Nodejs restFull Api PATCH method Working");
});
router.delete("/add-delte-category",function(req,res,next){

    res.send("Nodejs restFull Api DELETE method Working");
});


module.exports=router;