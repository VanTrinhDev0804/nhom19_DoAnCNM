const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  verifyAccount,
  resendOTP,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.post("/verify/:id", verifyAccount);
router.post("/resendotp/:id", resendOTP);
router.get("/logout/:id", logOut);

module.exports = router;
