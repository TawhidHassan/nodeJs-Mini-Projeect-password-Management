var express = require('express');
var router = express.Router();
module.exports = router;
var multer  = require('multer')
var productModel = require('../modules/products');

//image path
//limit:5mb
//filter :png,jpg,jpeg


router.get("/",function(req,res,next){

     res.json({
         message:"success"
     });
});

router.get('/getAllProduct', (req, res,next) => {
    productModel
    .find()
    .select("name price quantity")
    .exec()
    .then(data=>{
        res.status(200).json({
            message:"ok",
            results:data
        });
    })

});

router.post('/add', (req, res,next) => {

    var name=req.body.name;
    var price=req.body.price;
    var quantity=req.body.quantity;

    var productDeatils=new productModel({
        name:name,
        price:price,
        quantity:quantity
    });

    productDeatils.save()
    .then(doc=>{
        res.status(201).json({
            message:"ok save",
            results:doc
        });
    })
    .catch(err=>{
         res.json(err);
    });

});