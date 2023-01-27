import { Divider, Grid, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SideMenuButtons } from "../Assets/HomePage";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LogoutBtn from "./LogoutBtn";
import LanguageBtn from "./LanguageBtn";
import MobileNavigation from "./MobileNavigation";

export default function SideBar() {
  const navigate = useNavigate();

  const isMobileMatch = useMediaQuery("(max-width:600px)");

  if (isMobileMatch) {
    return <MobileNavigation />;
  }

  return (
    <Grid item sm={1.5} className="side-nav">
      <Stack direction="row" spacing={2} className="justify-content-center">
        <LogoutBtn />
        <LanguageBtn />
      </Stack>
      <div className="m-3">
        <div className="side-nav-logo-part">
          <h1 className="side-nav-text">AM</h1>
          <span className="side-nav-text">Apartment Manager</span>
          <Divider className="side-nav-divider" />
        </div>
        <div className="side-nav-icons">
          {SideMenuButtons.map((button, key) => (
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
            </div>
          ))}
        </div>
      </div>
    </Grid>
  );
}
