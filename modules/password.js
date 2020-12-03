var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/pms', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
var conn =mongoose.Collection;
var passSchema =new mongoose.Schema({
    password_category: {type:Schema.Types.ObjectId, ref:'password_categories',
        required: true,
        },
        project_name: {type:String, 
            required: true,
           },
        password_detail: {type:String, 
            required: true,
           },
    date:{
        type: Date, 
        default: Date.now }
});
passSchema.plugin(mongoosePaginate);
var passModel = mongoose.model('password_details', passSchema);
module.exports=passModel;
