const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:[true,'Username is required field']
    },
    email:{
        type:String,
        require:[true,'Email is required field']
    },
    password:{
        type:String,
        require:[true,'Password is required field']
    },
    role:{
        type:String,
        require:[true,'role is mandatory'],
        default:'superadmin'
    }
},{timestamps:true})



const User = mongoose.model('User',userSchema);

module.exports = User