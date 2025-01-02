const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,

             
    },
    profileImg:{
        type:String,
        
    },
    songs:{
        type:Array,
        default:[]
    }

})

const User = mongoose.model('User',userSchema)

module.exports = User