var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;
    require('dotenv').config()  
    var  dburl=process.env.MONGO_DB_URL;
    mongoose.connect(dburl, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

var conn =mongoose.Collection;

var productSchema =new mongoose.Schema({
        name: {type:String, 
            required: true,
           },
        price: {type:Number, 
            required: true,
           },
        quantity: {type:Number, 
            required: true,
           },
        iamge: {type:String, 
            required: true,
           },
    date:{
        type: Date, 
        default: Date.now }
});
productSchema.plugin(mongoosePaginate);
var productModel = mongoose.model('product', productSchema);
module.exports=productModel;
