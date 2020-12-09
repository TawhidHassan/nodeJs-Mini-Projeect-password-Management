var productModel = require('../../modules/products');
var multer  = require('multer')

exports.getAllProduct=(req, res,next) => {
    productModel
    .find()
    .select("name price quantity image")
    .exec()
    .then(data=>{
        res.status(200).json({
            message:"ok",
            results:data
        });
    })
}


exports.saveProduct=function(req, res,next){

    console.log(req.file);
    console.log(req.userData);

    var name=req.body.name;
    var price=req.body.price;
    var quantity=req.body.quantity;
    

    var productDeatils=new productModel({
        name:name,
        price:price,
        quantity:quantity,
        iamge:req.file.path
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

}