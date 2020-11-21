var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var session = require('express-session')
var passModel = require('../modules/password');
var userModule=require('../modules/user');
var passCatModel = require('../modules/passwordCategory');

var getPassCat=passCatModel.find({},{'passord_category':1,'_id':1});

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



router.put("/add-update-category/:id",function(req,res,next){

    var id=req.params.id;
    var passCategory=req.body.pass_cat;

    passCatModel.findById(id,function(err,data){

        data.passord_category=passCategory?passCategory:data.passord_category;
        data.save(function(){
            if(err)throw err;
            res.send("Nodejs restFull Api PUT method Working----Data update successfully");
        });
        
    })
   

   
});


router.patch("/update-category/:id",function(req,res,next){

    var id=req.params.id;
    var passCategory=req.body.pass_cat;

    passCatModel.findById(id,function(err,data){

        data.passord_category=passCategory?passCategory:data.passord_category;
        data.save(function(){
            if(err)throw err;
            res.send("Nodejs restFull Api PAtch method Working----Data update successfully");
        });
        
    })
   
});




router.delete("/add-delte-category",function(req,res,next){

    res.send("Nodejs restFull Api DELETE method Working");
});


module.exports=router;