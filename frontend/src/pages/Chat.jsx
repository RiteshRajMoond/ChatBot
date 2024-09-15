import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItems from "../components/ChatItems";
import { IoMdSend } from "react-icons/io";
import {
  fetchChats,
  sendChatRequest,
  deleteChats,
} from "../helper/api_communicator";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//Short+Long
// const chatMessages = [
//   { role: "user", content: "Hello, how can I create a new project in React?" },
//   {
//     role: "assistant",
//     content:
//       "To create a new React project, use the command: `npx create-react-app my-app`.",
//   },
//   { role: "user", content: "Great! How do I start the development server?" },
//   {
//     role: "assistant",
//     content:
//       "Once inside your project folder, run `npm start` to start the development server.",
//   },
//   { role: "user", content: "Thanks!" },
//   {
//     role: "assistant",
//     content: "You're welcome! Let me know if you need any further assistance.",
//   },
// ];
//Long
// const chatMessages = [
//   { role: "user", content: "Tell me about Cristiano Ronaldo." },
//   {
//     role: "assistant",
//     content:
//       "Cristiano Ronaldo is a Portuguese professional footballer widely regarded as one of the greatest players of all time. He has won numerous trophies, including five Ballon d'Or awards.",
//   },
//   { role: "user", content: "Which clubs has he played for?" },
//   {
//     role: "assistant",
//     content:
//       "Ronaldo started his senior career at Sporting CP before moving to Manchester United in 2003. He then joined Real Madrid in 2009, where he spent a decade before transferring to Juventus in 2018. In 2021, he returned to Manchester United.",
//   },
//   { role: "user", content: "What is his style of play?" },
//   {
//     role: "assistant",
//     content:
//       "Ronaldo is known for his incredible pace, powerful shots, precise heading ability, and remarkable physical fitness. He’s versatile, able to play both as a winger and a striker, and he excels at both scoring and assisting goals.",
//   },
//   { role: "user", content: "How many goals has he scored?" },
//   {
//     role: "assistant",
//     content:
//       "As of now, Ronaldo has scored over 800 career goals for both club and country, making him one of the top goal scorers in football history.",
//   },
//   {
//     role: "user",
//     content: "Wow, that's amazing! How about his international career?",
//   },
//   {
//     role: "assistant",
//     content:
//       "Ronaldo has had a stellar international career with Portugal. He’s the country's all-time leading goal scorer and has helped Portugal win the UEFA Euro 2016 and the UEFA Nations League in 2019.",
//   },
//   { role: "user", content: "Impressive! Has he broken any records?" },
//   {
//     role: "assistant",
//     content:
//       "Yes, Ronaldo holds numerous records, including being the first player to score in five different FIFA World Cups, and the all-time top scorer in the UEFA Champions League, among others.",
//   },
//   { role: "user", content: "Thanks for the info!" },
//   {
//     role: "assistant",
//     content: "You're welcome! Let me know if you have any more questions.",
//   },
// ];

const Chat = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async () => {
    const content = inputRef.current.value;
    if (inputRef && inputRef.current) inputRef.current.value = "";
    setMessages((prev) => [...prev, { role: "user", content }]);

    const chatData = await sendChatRequest(content);
    setMessages([...chatData.chats]);
  };

  const handleDelete = async () => {
    try {
      toast.loading("Deleting Chats...", {
        id: "deleteChats",
        position: "bottom-center",
      });
      await deleteChats();
      setMessages([]);
      toast.success("Chats Deleted!", {
        id: "deleteChats",
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("Unable to delete chats", {
        id: "deleteChats",
        position: "bottom-center",
      });
    }
  };

  useLayoutEffect(() => {
    if (auth.isLogged && auth.user) {
      toast.loading("Loading Chats...", {
        id: "loadChats",
        position: "bottom-center",
      });
      fetchChats()
        .then((data) => {
          setMessages([...data.chats]);
          toast.success("Chats Loaded!", {
            id: "loadChats",
            position: "bottom-center",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to load chats", {
            id: "loadChats",
            position: "bottom-center",
          });
        });
    }
  }, [auth]);

  useEffect(() => {
    if(!auth.user && !auth.isLogged) {
      return navigate('/login');
    }
  },[auth])

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17, 29, 39)",
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth.user ? auth.user.name[0] : ""}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "serif" }}>
            Welcome to Student-GPT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "serif", my: 4, p: 3 }}>
            This bot will help you prepare for Interview of your Dream
            Company✌️✌️
          </Typography>
          <Button
            onClick={handleDelete}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[400],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, sm: 1, xs: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: 600,
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model: Mixtral-8x7B-Instruct-v0.1
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {messages.map((chat, index) => (
            <ChatItems content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17, 27, 39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              color: "white",
              outline: "none",
              fontSize: "20px",
            }}
          />
          <IconButton
            sx={{ ml: "auto", color: "whitesmoke" }}
            onClick={handleSubmit}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
