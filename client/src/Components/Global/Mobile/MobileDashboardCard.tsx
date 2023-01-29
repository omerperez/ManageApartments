import { Skeleton, SwipeableDrawer } from "@mui/material";
import { useContext } from "react";
import { ApplicationContext } from "../../../Contexts/ApplicationContext";
import { AppContextType } from "../../../Data/types/Private";
import { SwipeableDrawerMui } from "../../../Layout/Mui/Home";
import HomeDashboard from "../../HomePage/ApartmentCard/HomeDashboard";

// MUI
const drawerBleeding = 56;

export default function MobileDashboardCard() {
  const { appState, onChangeMobileDashboard } = useContext(
    ApplicationContext,
  ) as AppContextType;

  const toggleDrawer = (newOpen: boolean) => () => {
    onChangeMobileDashboard(newOpen);
  };

  return (
    <div>
      <SwipeableDrawer
        className="drawer-dashboard"
        anchor="bottom"
        sx={SwipeableDrawerMui}
        open={appState?.isOpenDashboardMobile ?? false}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className="drawer-dashboard-body">
          <HomeDashboard language="he" />
        </div>
        <Skeleton variant="rectangular" height="100%" />
      </SwipeableDrawer>
    </div>
  );
}
