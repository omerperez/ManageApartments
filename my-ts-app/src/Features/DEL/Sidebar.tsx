import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  apartmentMenuItems,
  // muiSidebarStyle,
} from "../../Assets/Profile";

export default function PermanentDrawerRight(childer: JSX.Element) {
  return (
    <Box>
      {/* sx={muiSidebarStyle.displayFlex}> */}
      <Box component="main">
        {/* sx={muiSidebarStyle.childerBox} */}
        {childer}
      </Box>
      <Drawer variant="permanent" anchor="right">
        {/* sx={muiSidebarStyle.drawerSx} */}
        <List>
          {/* sx={muiSidebarStyle.directionRtl} */}
          {apartmentMenuItems.map((menuItem, index) => (
            <ListItem button key={`apartment-menu-${menuItem.label}-${index}`}>
              <ListItemText primary={menuItem.label} className="text-start" />
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
