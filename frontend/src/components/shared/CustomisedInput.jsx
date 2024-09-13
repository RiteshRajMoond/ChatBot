import React from "react";
import { TextField } from "@mui/material";

const CustomisedInput = (props) => {
  return (
    <TextField
      name={props.name}
      label={props.label}
      type={props.type}
      margin="normal"
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
    />
  );
};

export default CustomisedInput;
