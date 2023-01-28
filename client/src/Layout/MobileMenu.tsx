import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { KeyboardEvent, MouseEvent } from "react";

interface MobileSideMenuProps {
  open: boolean;
  toggleDrawer: (event: KeyboardEvent | MouseEvent) => void;
}
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MobileSideMenu({
  open,
  toggleDrawer,
}: MobileSideMenuProps) {
  return (
    <>
      {/* <Button onClick={toggleDrawer(true)}>Open</Button> */}
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250, background: "#1976d2", minHeight: "100vh" }}
          className="color-white rtl"
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <DrawerHeader
            className="rtl"
            // sx={{ background: "white", color: "#1976d2" }}
          >
            <div className="text-center w-100">
              <h5 className="fw-bolder">Apartment Managment</h5>
            </div>
          </DrawerHeader>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
