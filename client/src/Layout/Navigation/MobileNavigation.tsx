import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateApartmentBtn from "../../Components/Global/Buttons/CreateApartmentBtn";
import LanguageBtn from "../../Components/Global/Buttons/LanguageBtn";
import LogoutBtn from "../../Components/Global/Buttons/LogoutBtn";
import MobileDashboardCard from "../../Components/Global/Mobile/MobileDashboardCard";
import MobileBottomNavigation from "./MobileBottomNavigation";

// Constans
const SYSTEM_NAME = "AM";
// MUI
const mobileAppBarContainerMui = {
  width: "100%",
  height: 50,
  "& .css-11b3ww9-MuiPaper-root-MuiAppBar-root": {
    backgroundColor: "#0b6efe",
  },
};

export default function MobileNavigation() {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    return navigate("/home");
  };

  return (
    <Box sx={mobileAppBarContainerMui} className="ltr">
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            onClick={handleClickLogo}
            component="div"
            className="application-nav-name"
            sx={{ flexGrow: 1 }}
          >
            {SYSTEM_NAME}
          </Typography>
          <LanguageBtn />
          <CreateApartmentBtn />
          <LogoutBtn />
        </Toolbar>
      </AppBar>
      <MobileBottomNavigation />
      <MobileDashboardCard />
    </Box>
  );
}
