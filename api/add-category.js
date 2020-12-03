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
        // res.send(data);
        res.status(200).json({
            messege:"Success",
            result:data
        });
      });
   
});


router.post("/add-category",function(req,res,next){

    var passCategory=req.body.pass_cat;
    var passCatDetail=new passCatModel({passord_category:passCategory});
    // passCatDetail.save(function(err,doc){
    //     if(err)throw err;
    //     res.send("success---Nodejs restFull Api POST method Working");
        
    // }) 
    passCatDetail.save()
    .then(doc=>{
        res.status(201).json({
            messege:"Category saved successfully",
            result:doc
        });
    })
    .catch(err=>{
         res.json(err);
    });

});



router.put("/add-update-category/:id",function(req,res,next){

    var id=req.params.id;
    var passCategory=req.body.pass_cat;

    passCatModel.findById(id,function(err,data){

        data.passord_category=passCategory?passCategory:data.passord_category;
        // data.save(function(){
        //     if(err)throw err;
        //     res.send("Nodejs restFull Api PUT method Working----Data update successfully");
        // });

        data.save()
        .then(doc=>{
            res.status(201).json({
                messege:"Category update successfully",
                result:doc
            });
        })
        .catch(err=>{
             res.json(err);
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




router.delete("/add-delte-category/:id",function(req,res,next){
    var id=req.params.id;
    // passCatModel.findById(id,function(err,data){
    //     data.delete(function(){
    //         if(err)throw err;
    //         res.send("Nodejs restFull Api DELTE method Working----Data DELETE successfully");
    //     });    
    // })

    passCatModel.findByIdAndRemove(id)
    .then(doc=>{
        res.status(201).json({
            messege:"Category deleted successfully",
            result:doc
        });
    })
    .catch(err=>{
         res.json(err);
    })
});

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
    passModel.find().exec(function(err,data){
        if(err) throw err;
        // res.send("Nodejs restFull Api GET method Working"+data);
        // res.send(data);
        res.status(200).json({
            messege:"Success",
            result:data
        });
      });
   
});

module.exports=router;