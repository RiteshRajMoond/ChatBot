import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomisedInput from "../components/shared/CustomisedInput";
import { CgLogIn } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      toast.loading("Logging In...", { id: "login" });
      await auth.login(email, password);
      toast.success("Logged In Successfully", { id: "login" });
    } catch (error) {
      toast.error("Login Failed", { id: "login" });
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth.user && auth.isLogged) return navigate("/chat");
  });

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="ac2.png" alt="Assassin" width={"300px"} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 10px 10px #000000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign={"center"}
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomisedInput name="email" label="Email" type="email" />
            <CustomisedInput name="password" label="Password" type="password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                color: "black",
                fontWeight: 600,
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<CgLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
