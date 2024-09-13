const express = require("express");

const userController = require("../controller/user-controller");
const { signupValidator, loginValidator } = require("../middlewares/validators");
const { verifyToken } = require("../utils/token-manager");

const router = express.Router();

router.get("/getAll", userController.getAllUsers);

router.post("/signup", signupValidator, userController.signup);
router.post("/login", loginValidator, userController.login);
router.get("/logout", userController.logout);
router.get("/auth-status", verifyToken, userController.verifyUser);

module.exports = router;