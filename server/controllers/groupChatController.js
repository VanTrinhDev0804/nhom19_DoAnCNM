const GroupChats = require('../models/groupChatModel');

module.exports.create = async (req, res, next) => {
    try {
      const { groupname, users , admingroup, avatarImage } = req.body.dataCreate;

      const groupnameCheck = await GroupChats.findOne({ groupname });
      if (groupnameCheck){
        return res.json({ msg: "Tên Nhóm Đã Tồn Tại!", status: false });
      }
    
      const groupChat = await GroupChats.create({
        groupname,
        users,
        admingroup,
        avatarImage
       
      }) 
      return res.json({ status: true, groupChat : groupChat });
    } catch (ex) {
      next(ex);
    }
  };


  module.exports.getChatGroups = async (req, res, next) => {
    try {
     const  id   = req.params.id

     const groups = await  GroupChats.find({
      users: {
        $all: [id],
      },
    })
  
      return res.json(groups);
    } catch (ex) {
      next(ex);
    }
  };
  
  module.exports.updateChatGroups = async (req, res, next) => {
    try {
     const  id   = req.params.id
     const { groupname, users , admingroup, avatarImage } = req.body.dataUpdate;

     const groupsupdate = await  GroupChats.findByIdAndUpdate({_id : id} , {
        groupname,
        users,
        admingroup,
        avatarImage
     })
    
      return res.json({ status: true, groupsupdate : groupsupdate });
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.deleteChatGroups = async (req, res, next) => {
    try {
     const  id   = req.params.id
  
      const groups = await  GroupChats.findOneAndDelete({_id : id})
     
      return res.json({status : true,  groups})
    } catch (ex) {
      next(ex);
      return res.json({status : false })
    }
  };
  module.exports.exitChatGroups = async (req, res, next) => {
    try {
     const  id   = req.params.id  // id nhóm
      const  lstupdate  = req.body.lstupdate
      const groups = await  GroupChats.findOneAndUpdate({_id : id}, {users : lstupdate})
      
      

      return res.json({status : true , groups})
    } catch (ex) {
      next(ex);
      
      return res.json({status : false })
    }
  };