import React, { useState, MouseEvent, useContext } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import useLocalStorage from "../Hooks/useLocalStorage";
import { AuthContext } from "../Contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutBtn() {
  const { state, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    dispatch({ type: "logout" });
  };
  return (
    <IconButton
      id="logout-button"
      onClick={handleClick}
      // variant="text"
      // sx={{ direction: "ltr" }}
      className={`lan-btn-design`}
      // endIcon={<LogoutIcon className="lan-icon" />}
    >
      {/* {state.language === "en" ? "Logout" : "התנתק"} */}
      <LogoutIcon className="lan-icon" />
    </IconButton>
  );
}
