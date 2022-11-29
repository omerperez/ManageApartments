import React, { useState, MouseEvent, useContext } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import useLocalStorage from "../Hooks/useLocalStorage";
import { AuthContext } from "../Contexts/AuthContext";
import LanguageIcon from "@mui/icons-material/Language";

export default function LanguegeBtn() {
  const { state, dispatch } = useContext(AuthContext);
  const [language, setLanguage] = useLocalStorage("language", "en");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (isEnglish: boolean) => {
    const lan: string = isEnglish ? "en" : "he";
    setLanguage(lan);
    dispatch({ type: "changeLanguage", language: lan });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="text"
        sx={{ direction: "ltr" }}
        className={`lan-btn-design`}
        endIcon={<LanguageIcon className="lan-icon" />}
      >
        {language === "en" ? "en" : "he"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick(false)}>Hebrow</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(true)}>English</MenuItem>
      </Menu>
    </div>
  );
}
