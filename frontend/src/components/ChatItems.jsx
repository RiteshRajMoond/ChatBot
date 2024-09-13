import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { blue } from "@mui/material/colors/";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message) {
  const blocks = message.split(/(```[\s\S]*?```)/).filter(Boolean);
  return blocks.map((block) => {
    if (block.startsWith("```") && block.endsWith("```")) {
      const content = block.slice(3, -3).trim();
      const firstLineEnd = content.indexOf("\n");
      const language = content.slice(0, firstLineEnd).trim();
      const code = content.slice(firstLineEnd + 1).trim();
      return { type: "code", language, content: code };
    }
    return { type: "text", content: block };
  });
}

function isCodeBlock(str) {
  return str.type === "code";
}

const ChatItems = ({ role, content }) => {
  const msgBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role === "assistant" ? (
    <>
      <Box sx={{ display: "flex", p: 2, my: 2, gap: 2, bgcolor: "#004d5612" }}>
        <Avatar sx={{ ml: 0 }}>
          <img
            src="https://api.dicebear.com/9.x/bottts/svg?backgroundType=gradientLinear"
            alt="Assistant"
            width={"30px"}
          />
        </Avatar>
        <Box>
          {!msgBlocks && (
            <Typography sx={{ fontSize: "20px", color: blue[100] }}>
              {content}
            </Typography>
          )}
          {msgBlocks &&
            msgBlocks.length &&
            msgBlocks.map((block, index) =>
              isCodeBlock(block) ? (
                <>
                  {" "}
                  <SyntaxHighlighter
                    style={coldarkDark}
                    language={block.language || "text"}
                  >
                    {block.content}
                  </SyntaxHighlighter>{" "}
                </>
              ) : (
                <>
                  <Typography sx={{ fontSize: "20px", color: blue[100] }}>
                    {block.content}
                  </Typography>
                </>
              )
            )}
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Box sx={{ display: "flex", p: 2, gap: 2, bgcolor: "#004d56", my: 2 }}>
        <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
          {auth.user ? auth.user.name[0] : ""}
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ChatItems;
