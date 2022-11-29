import React, { useId, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Tooltip,
} from "@mui/material";
import { logoImage } from "../../Assets/StaticImages";
import { Stack } from "@mui/system";
import { Home, AccountCircle, Logout, Login } from "@mui/icons-material";
import { pages, appBarSx } from "./StaticLayoutVar";
import "./Layout.css";

const ResponsiveAppBar = () => {
  const id = useId();
  const [isSignin, setIsSignin] = useState<boolean>(true);

  return (
    <AppBar
      position="static"
      sx={{ flexGrow: 1, direction: "rtl" }}
      className="bg-appbar"
    >
      <Container maxWidth="lg" className="p-0">
        <Toolbar disableGutters>
          <img src={logoImage} width={85} />
          <Typography variant="h5" component="div" sx={appBarSx}>
            ניהול נכסים
          </Typography>
          {!isSignin && (
            <Stack direction="row" spacing={1} style={{ marginRight: 25 }}>
              {pages.map((page, index) => {
                return (
                  <Tooltip title={page} id={id} className="color-white">
                    <IconButton id={`iconbutton${id}`}>
                      {page === "עמוד הבית" && (
                        <Home fontSize="large" id={`homepageicon${id}`} />
                      )}
                      {page === "הפרופיל שלי" && (
                        <AccountCircle
                          id={`accounticon${id}`}
                          fontSize="large"
                        />
                      )}
                      {page === "התנתקות" && (
                        <Login id={`loginicon${id}`} fontSize="large" />
                      )}
                    </IconButton>
                  </Tooltip>
                );
              })}
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
