import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";

export default function LogoutBtn() {
  const { logout } = useContext(AuthContext) as AuthContextType;

  const handleClick = () => {
    logout();
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
