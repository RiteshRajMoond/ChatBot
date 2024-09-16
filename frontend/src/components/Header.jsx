import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/logo";
import { useAuth } from "../context/AuthContext";
import NavLink from "./shared/NavLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth.isLogged ? (
            <>
              <NavLink
                to="/chat"
                bg="#00fffc"
                text="Go To Chat"
                textColor="black"
              />
              <NavLink
                to="/"
                bg="#51538f"
                text="Logout"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                bg="#00fffc"
                text="Login"
                textColor="black"
              />
              <NavLink
                to="/signup"
                bg="#51538f"
                text="Signup"
                textColor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
