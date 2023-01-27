import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";

interface LogoutBtnProps {
  className?: string;
}
export default function LogoutBtn({ className }: LogoutBtnProps) {
  const { logout } = useContext(AuthContext) as AuthContextType;

  const handleClick = () => {
    logout();
  };
  return (
    <IconButton
      id="logout-button"
      onClick={handleClick}
      className={className ?? `lan-btn-design`}
    >
      <LogoutIcon className="lan-icon" />
    </IconButton>
  );
}
