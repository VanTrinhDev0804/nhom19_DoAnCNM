const Messages = require("../models/messageModel");
const User = require("../models/userModel")

module.exports.getMessages = async (req, res, next) => {
  try {
    const {from,  to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [ from , to ],
      },
    }).sort({ updatedAt: 1 });
  
    const projectedMessages = messages.map( (msg) => {
      return {
        _id : msg._id,
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
   
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
module.exports.getMessagesGroup = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [ to ],
      },
    }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map( (msg) => {
      return {
        _id : msg._id,
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        nameSender: msg.nameSenderInGroup
      };
    });

    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const user = await User.findOne({ _id :  from});
 
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      nameSenderInGroup: user.username.split(' ').slice(-1).join(' ') === "" ? user.username : user.username.split(' ').slice(-1).join(' ')

    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
module.exports.deleteteMessages = async (req, res, next) => {
  try {
   const  id   = req.params.id

    const msg = await  Messages.findOneAndDelete({_id : id})
 
    return res.json({status : true,  message: msg.message.text})
  } catch (ex) {
    next(ex);
    return res.json({status : false })
  }
};
