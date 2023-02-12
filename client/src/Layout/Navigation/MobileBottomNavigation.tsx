import { Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mobileMenuButtons } from "../../Assets/Menu";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { AuthContextType } from "../../Data/types/Auth";
import { AppContextType } from "../../Data/types/Private";
import {
  MuiMobileMenuButton,
  MuiMobileMenuButtonActive,
  MuiPapperMobileMenu,
} from "../Mui/Menu";

export default function MobileBottomNavigation() {
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const { authState } = useContext(AuthContext) as AuthContextType;
  const { onChangeMobileDashboard } = useContext(
    ApplicationContext,
  ) as AppContextType;

  const handleClickNavigationAction = (event, newValue) => {
    const currentBtn = mobileMenuButtons[newValue];
    if (currentBtn.navigate) {
      navigate(currentBtn.navigate);
    } else {
      onChangeMobileDashboard(true);
    }
    setIndex(newValue);
  };

  const directionClass = authState.language === "en" ? "ltr" : "rtl";
  return (
    <Paper sx={MuiPapperMobileMenu} elevation={4} className={directionClass}>
      <BottomNavigation
        sx={MuiMobileMenuButton}
        value={index}
        onChange={handleClickNavigationAction}
      >
        {mobileMenuButtons.map((btn, key) => (
          <BottomNavigationAction
            sx={key === index ? MuiMobileMenuButtonActive : null}
            key={`bottom-nav-btn-${key}-${btn.label}`}
            label={btn.label}
            icon={btn.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
