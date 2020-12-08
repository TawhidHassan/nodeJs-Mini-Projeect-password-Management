var express = require('express');
var router = express.Router();
module.exports = router;
var multer  = require('multer')

var productModel = require('../modules/products');


//for middelware
var checkAuth=require('./middleware/auth');

//image path
//limit:5mb
//filter :png,jpg,jpeg
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
  });

  const fileFilter=(req,file,cb)=>{
      if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'){
          cb(null ,true);
      }else{
          cb(null,false);
      }
  }

  var upload = multer({ 
      storage:storage,
      limits:{
          fileSize:1024*1024*5
      },
      fileFilter:fileFilter
});






router.get("/",checkAuth,function(req,res,next){

     res.json({
         message:"success"
     });
});

router.get('/getAllProduct', checkAuth,(req, res,next) => {
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

});

router.post('/add',upload.single('productImage'),checkAuth,function(req, res,next){

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

});