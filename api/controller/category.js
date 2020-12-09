var passCatModel = require('../../modules/passwordCategory');
var getPassCat=passCatModel.find({},{'passord_category':1,'_id':1});
exports.getCategory=function(req,res,next){
    getPassCat.exec(function(err,data){
        if(err) throw err;
        // res.send("Nodejs restFull Api GET method Working"+data);
        // res.send(data);
        res.status(200).json({
            messege:"Success",
            result:data
        });
      });
}

exports.addcategory=function(req,res,next){

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

}

exports.addAndUpdateCategory=function(req,res,next){

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
}

exports.updateCategory=function(req,res,next){

    var id=req.params.id;
    var passCategory=req.body.pass_cat;

    passCatModel.findById(id,function(err,data){

        data.passord_category=passCategory?passCategory:data.passord_category;
        data.save(function(){
            if(err)throw err;
            res.send("Nodejs restFull Api PAtch method Working----Data update successfully");
        });
        
    })
   
}

exports.deleteCategory=function(req,res,next){
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
}