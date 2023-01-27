import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import MobileMenu from "./MobileMenu";

export default function MobileNavigation() {
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            AM
          </Typography>
          <LogoutBtn className="white-logout-btn" />
        </Toolbar>
      </AppBar>
      {open && <MobileMenu open={open} handleDrawerClose={handleDrawerClose} />}
    </Box>
  );
}
