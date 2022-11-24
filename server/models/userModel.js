const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isVerify:{
    type :Boolean,
   default : false
  },
  isAvatarImageSet: {
    type: Boolean,
    default: true,
  },
  avatarImage: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360",
  },
  otp:Number,
  otp_expiry:Date ,

  
});

userSchema.methods.getJWTToken = function (){
  return jwt.sign({_id: this._id} , process.env.JWT_SECRET, {
      expiresIn : process.env.JWT_COOKIE_EXPIRE,
  })
}

module.exports = mongoose.model("Users", userSchema);
