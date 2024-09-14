// const Openai = require("openai");
const { HfInference } = require("@huggingface/inference");

const User = require("../models/User");
require("dotenv").config();

// const openai = new Openai({
//   apiKey: process.env.OPENAI_SECRET,
// });

const inference = new HfInference(process.env.HUGGING_FACE_ACCESS_TOKEN);

// Havent been tested these paths!
// exports.generateChatCompletion = async (req, res, next) => {
//   try {
//     const { message } = req.body;
//     const user = await User.findById(res.locals.jwtData.id);

//     if (!user) return res.status(404).send("User not found");

//     // 3 steps:
//     // 1. Grab all previos Chats

//     const chats = user.chats.map(({ role, content }) => ({ role, content })); // creates an array of objects with role and content
//     chats.push({ role: "user", content: message }); // pushes the latest message to the above chats array created
//     user.chats.push({ role: "user", content: message }); // pushes the latest message to the database

//     // 2. Send all prev chats plus the new one to OpenAI api

//     const config = openaiConfig();
//     const openaiApi = new openai.OpenAIApi(config);

//     // 3. get latest response

//     const response = await openaiApi.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: chats,
//     });
//     user.chats.push(response.data.choices[0].message);
//     await user.save();
//     return res.status(200).json({ chats: user.chats });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .send("An error occured while trying to generate chat completion");
//   }
// };

exports.generateChatCompletion = async (req, res, next) => {
  try {
    const { message } = req.body;

    const user = await User.findById(res.locals.jwtData.id);

    if (!user) return res.status(404).json({ message: "user Not Found!" });

    // 1. Grab all previous chats and the current message
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // 2. Send all previous chats plus the new one to OpenAI API
    // Original Code Using OpenAI DID not work because openai are leaches!!!
    // const chatResponse = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: chats,
    //   max_tokens: 5
    // })

    // MODEL -> mistralai/Mistral-7B-v0.1
    // const response = await axios.post(
    //   "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1",
    //   {
    //     inputs: chats,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.HUGGING_FACE_ACCESS_TOKEN}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // MODEL -> mistralai/Mistral-7B-Instruct-v0.3

    let assistantResponse = "";

    for await (const chunk of inference.chatCompletionStream({
      model: process.env.HUGGING_FACE_MODEL,
      messages: chats,
      max_tokens: 250,
    })) {
      assistantResponse += chunk.choices[0].delta.content;
    }
    user.chats.push({ role: "assistant", content: assistantResponse });
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occured while trying to generate chat completion",
    });
  }
};

exports.fetchChats = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(404).json({ message: "User not found!" });
    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(401).json({ message: "Unauthorized!" });
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    return res.stauts(500).json({ message: error.message });
  }
};

exports.deleteChats = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(404).json({ message: "User not found!" });
    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(401).json({ message: "Unauthorized!" });
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "Chats deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
