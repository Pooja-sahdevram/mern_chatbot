const { Router } = require("express");
const { verifyToken } = require("../utils/token-manager.js");
const { chatCompletionValidator, validate } = require("../utils/validator.js");
const {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} = require("../controllers/chat-controller.js");
const chatRoutes = Router();

chatRoutes.post(
  "/new",
    validate(chatCompletionValidator),
    verifyToken,
    generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);


module.exports = {
    chatRoutes
}