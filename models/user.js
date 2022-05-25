const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName:String,
    lastName:String,
    isAdmin:{type:Boolean,default:false},
    displayName:{type:String,default:'NewUser'},
    profileImage:{type:String,default:'/image/user-default.jpg'},
    
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);