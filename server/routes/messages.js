const { addMessage, getMessages , getMessagesGroup, deleteteMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/deletemsg/:id", deleteteMessages);
router.post("/getmsggroup/", getMessagesGroup);

module.exports = router;
