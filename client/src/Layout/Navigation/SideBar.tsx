import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Divider, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sideMenuButtons } from "../../Assets/Menu";
import LanguageBtn from "../../Components/Global/Buttons/LanguageBtn";
import LogoutBtn from "../../Components/Global/Buttons/LogoutBtn";
import MobileNavigation from "./MobileNavigation";

// Constans
const AM = "AM";
const APPLICATION_NAME = "Apartment Managment";

export default function SideBar() {
  const navigate = useNavigate();

  const isMobileMatch = useMediaQuery("(max-width:600px)");

  if (isMobileMatch) {
    return <MobileNavigation />;
  }

  return (
    <div className="side-menu-bg">
      <Stack direction="row" className="justify-content-center">
        <LogoutBtn />
        <LanguageBtn />
      </Stack>
      <div className="m-3">
        <div className="side-nav-logo-part">
          <h1 className="side-nav-text">{AM}</h1>
          <span className="side-nav-text">{APPLICATION_NAME}</span>
          <Divider className="side-nav-divider" />
        </div>
        <div className="side-nav-icons-container">
          {sideMenuButtons.map((button, key) => (
            <div
              className="side-nav-icons-space"
              key={`homepage-btn-sidebar${key}`}
            >
              <IconButton
                onClick={() => {
                  navigate(button.to);
                }}
              >
                {button.icon}
              </IconButton>
              <div className="color-white">{button.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
