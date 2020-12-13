const mongoose = require('mongoose');
require('dotenv').config()  
var  dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
var conn =mongoose.Collection;
var passcatSchema =new mongoose.Schema({
    passord_category: {type:String, 
        required: true,
        index: {
            unique: true,        
        }},

    date:{
        type: Date, 
        default: Date.now }
});

var passCateModel = mongoose.model('password_categories', passcatSchema);
module.exports=passCateModel;