const { 
    create,
    getChatGroups,
     updateChatGroups,
     deleteChatGroups,
     exitChatGroups
} = require("../controllers/groupChatController");




const router = require("express").Router();

router.post("/create/:id", create);
// router.post("/register", register);
router.get("/getgroupchat/:id", getChatGroups);
router.post("/updategroupchat/:id", updateChatGroups);
router.post("/deletegroups/:id", deleteChatGroups);
router.post("/exitgroupchats/:id", exitChatGroups);
// router.post("/setavatar/:id", setAvatar);
// router.post("/verify/:id", verifyAccount);
// router.post("/resendotp/:id", resendOTP);
// router.get("/logout/:id", logOut);

module.exports = router;