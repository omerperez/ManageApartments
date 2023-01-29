import { Apartment, Assessment, Calculate, Home } from "@mui/icons-material";
import { Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { AuthContextType } from "../../Data/types/Auth";
import { AppContextType } from "../../Data/types/Private";

// Constans
const HOME_PAGE = "בית";
const MY_ASSETS = "הנכסים שלי";
const CALCULATES = "מחשבונים";
const ASSESSMENT = "מדדים";

const bottomNavigationPapperMui = {
  position: "fixed",
  bottom: -0.5,
  left: 0,
  right: 0,
  zIndex: 10,
  height: 50,
};

const mobileBottomNavigationBtns = [
  {
    label: HOME_PAGE,
    icon: <Home />,
    navigate: "/home",
  },
  {
    label: MY_ASSETS,
    icon: <Apartment />,
    navigate: "/my-apartment",
  },
  {
    label: CALCULATES,
    icon: <Calculate />,
    navigate: "/calculate",
  },
  {
    label: ASSESSMENT,
    icon: <Assessment />,
    navigate: "",
  },
];

const buttonNavigatioMui = {
  background: "#0b6efe",
  "& .css-imwso6-MuiBottomNavigationAction-label": {
    color: "#b9e1ff",
  },
  "& .css-i4bv87-MuiSvgIcon-root": {
    color: "#b9e1ff",
  },
};

const buttonNavigatioActiveMui = {
  "& .css-imwso6-MuiBottomNavigationAction-label": {
    color: "white",
  },
  "& .css-i4bv87-MuiSvgIcon-root": {
    color: "white",
  },
};

export default function MobileBottomNavigation() {
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const { authState } = useContext(AuthContext) as AuthContextType;
  const { onChangeMobileDashboard } = useContext(
    ApplicationContext,
  ) as AppContextType;

  const handleClickNavigationAction = (event, newValue) => {
    const currentBtn = mobileBottomNavigationBtns[newValue];
    if (currentBtn.navigate) {
      navigate(currentBtn.navigate);
    } else {
      onChangeMobileDashboard(true);
    }
    setIndex(newValue);
  };

  const directionClass = authState.language === "en" ? "ltr" : "rtl";
  return (
    <Paper
      sx={bottomNavigationPapperMui}
      elevation={4}
      className={directionClass}
    >
      <BottomNavigation
        sx={buttonNavigatioMui}
        value={index}
        onChange={handleClickNavigationAction}
      >
        {mobileBottomNavigationBtns.map((btn, key) => (
          <BottomNavigationAction
            sx={key === index ? buttonNavigatioActiveMui : null}
            key={`bottom-nav-btn-${key}-${btn.label}`}
            label={btn.label}
            icon={btn.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
