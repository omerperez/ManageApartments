import { Button, Grid, Skeleton, SwipeableDrawer } from "@mui/material";
import { useState } from "react";
import { topDashboardTitles } from "../../../Assets/HomePage";
import useMobieDesign from "../../../Hooks/useMobile";
import { SwipeableDrawerMui } from "../../../Layout/Mui/Home";
import GlobalButton from "../../Global/GlobalButton";
import DashboardCard from "../DashboardCard";

interface DashboardProps {
  language: string;
}

// Constans
const SHOW_HOME_DASHBOARD = "הצג נתוני דירות";
const drawerBleeding = 56;

export default function HomeDashboard({ language }: DashboardProps) {
  const [open, setOpen] = useState(false);
  const isMobileDesign = useMobieDesign();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const homeDashboardElement = (
    <Grid container spacing={2}>
      {topDashboardTitles.map((card, index) => (
        <Grid
          item
          xs={12}
          sm={3}
          key={`topDashboardTitle-${card.en_title + index}`}
        >
          <div>
            <DashboardCard
              language={language}
              card={card}
              body={index !== 1 ? 10 * index : 3000}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );

  if (isMobileDesign) {
    return (
      <div>
        <Button
          className="home-action-btn"
          fullWidth={true}
          onClick={toggleDrawer(true)}
        >
          {SHOW_HOME_DASHBOARD}
        </Button>
        <SwipeableDrawer
          className="drawer-dashboard"
          anchor="bottom"
          sx={SwipeableDrawerMui}
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className="drawer-dashboard-body">{homeDashboardElement}</div>
          <Skeleton variant="rectangular" height="100%" />
        </SwipeableDrawer>
      </div>
    );
  }

  return homeDashboardElement;
}
