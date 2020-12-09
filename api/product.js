var express = require('express');
var router = express.Router();
module.exports = router;
var multer  = require('multer')

var productModel = require('../modules/products');
const productController=require('./controller/producrt');

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

router.get('/getAllProduct', checkAuth,productController.getAllProduct);

router.post('/add',upload.single('productImage'),checkAuth,productController.saveProduct);