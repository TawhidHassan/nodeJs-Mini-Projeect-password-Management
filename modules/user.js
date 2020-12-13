const mongoose = require('mongoose');
require('dotenv').config()  
var  dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
var conn =mongoose.Collection;

var userSchema =new mongoose.Schema({
    username: {type:String, 
        required: true,
        index: {
            unique: true,        
        }},

	email: {
        type:String, 
        required: true,
        index: {
            unique: true, 
        },},
    password: {
        type:String, 
        required: true
    },
    date:{
        type: Date, 
        default: Date.now }
});

var userModel = mongoose.model('users', userSchema);
module.exports=userModel;