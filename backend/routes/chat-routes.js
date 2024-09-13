const express = require("express");

const chatController = require("../controller/chat-controller");
const { verifyToken } = require("../utils/token-manager");
const { chatCompleteValidator } = require("../middlewares/validators");

const router = express.Router();

// Protected API
router.post(
  "/new",
  chatCompleteValidator,
  verifyToken,
  chatController.generateChatCompletion
);

router.get("/fetch-chats", verifyToken, chatController.fetchChats);

router.delete('/delete-chats', verifyToken, chatController.deleteChats);

module.exports = router;
