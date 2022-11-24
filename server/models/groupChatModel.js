const mongoose = require("mongoose");


const groupChatSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
    unique: true,
  },
  users: Array,
  admingroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
 
  avatarImage: {
    type: String,
    default: "",
  },
  otp:Number,
  otp_expiry:Date ,

  
});



module.exports = mongoose.model("GroupChats",groupChatSchema);
