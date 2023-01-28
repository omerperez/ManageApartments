import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { KeyboardEvent, MouseEvent, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import MobileMenu from "./MobileMenu";

export default function MobileNavigation() {
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as KeyboardEvent).key === "Tab" ||
        (event as KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  // Constans
  const SYSTEM_NAME = "AM";

  return (
    <Box sx={{ width: "100%", direction: "ltr" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {SYSTEM_NAME}
          </Typography>
          <LogoutBtn className="white-logout-btn" />
        </Toolbar>
      </AppBar>
      <MobileMenu open={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
