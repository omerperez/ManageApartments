import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { AuthContextType } from "../../../Data/types/Auth";

// Constans
const LOGOUT_BTN_TOOLTIP = "התנתק";

interface LogoutBtnProps {
  className?: string;
}
export default function LogoutBtn({ className }: LogoutBtnProps) {
  const { logout } = useContext(AuthContext) as AuthContextType;

  const handleClick = () => {
    logout();
  };

  return (
    <Tooltip title={LOGOUT_BTN_TOOLTIP}>
      <IconButton
        id="logout-button"
        onClick={handleClick}
        className="logout-btn"
      >
        <LogoutIcon className="lan-icon" />
      </IconButton>
    </Tooltip>
  );
}
