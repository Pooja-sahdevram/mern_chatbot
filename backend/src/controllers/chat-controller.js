const User = require("../model/User.js");
const { configureOpenAI } = require("../config/openai-config.js");
const { OpenAI, ChatCompletionRequestMessage } = require("openai");
 const generateChatCompletion = async (req, res,) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, clever, and eager to assist you.`

    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) ;
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to openAI API
    // const config = configureOpenAI();
    const openai = new OpenAI({key:  process.env.OPEN_AI_SECRET});
    const chatResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chats,
      }); 
    user.chats.push(chatResponse.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }

};

const sendChatsToUser = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

const deleteChats = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

module.exports = {generateChatCompletion, sendChatsToUser, deleteChats};