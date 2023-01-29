import { Language } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { AuthContextType } from "../../../Data/types/Auth";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

// Constans
const HE = "Hebrow";
const EN = "English";

// MUI
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 25,
    top: 20,
    border: `1px solid white`,
    padding: "0 5px",
    background: "#4099ff",
    textTransform: "uppercase",
  },
}));

export default function LanguageBtn() {
  const { changeLanguage } = useContext(AuthContext) as AuthContextType;
  const [language, setLanguage] = useLocalStorage("language", "en");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (isEnglish: boolean) => {
    const lan: string = isEnglish ? "en" : "he";
    setLanguage(lan);
    changeLanguage(lan);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        className="lan-btn-design"
        title={language === "en" ? "EN" : "HE"}
      >
        <StyledBadge badgeContent={language === "en" ? "EN" : "HE"}>
          <Language className="lan-icon" />
        </StyledBadge>

        {/* <div className="language-btn-text">
          {language === "en" ? "EN" : "HE"}
        </div> */}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick(false)}>{HE}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(true)}>{EN}</MenuItem>
      </Menu>
    </div>
  );
}
