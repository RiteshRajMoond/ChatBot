import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="ac.jpg"
          alt="openai"
          width={"40px"}
          height={"40px"}
          className="image-inverted"
        ></img>
      </Link>

      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px black",
        }}
      >
        <span style={{ fontSize: "20px" }}>Student</span>-GPT
      </Typography>
    </div>
  );
};

export default Logo;
