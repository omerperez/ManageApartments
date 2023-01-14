import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import LanguageBtn from "../Layout/LanguageBtn";
import Loading from "../Layout/Loading";
import LogoutBtn from "../Layout/LogoutBtn";
import SideBar from "../Layout/SideBar";
import { verifyToken } from "../Services/Api/AuthApi";
import CookieService from "../Services/CookieService";

interface PrivateRouterProps {
  children: JSX.Element;
}

export default function PrivateRouter({ children }: PrivateRouterProps) {
  const { authState, login, logout } = useContext(
    AuthContext,
  ) as AuthContextType;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = CookieService.getToken();
      if (token) {
        try {
          const response = await verifyToken(token);
          if (response.userId === CookieService.getUserId()) {
            login({
              mobile: response.userId,
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              language: "he",
              token: token,
            });
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      }

      setLoading(false);
    };
    verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return authState.token ? (
    <div className="router-layout project-font">
      <div className={`home-layout-${authState.language}`}>
        <Grid container>
          <Grid item sm={1.5} className="side-nav">
            <Stack
              direction="row"
              spacing={2}
              className="justify-content-center"
            >
              <LogoutBtn />
              <LanguageBtn />
            </Stack>
            <SideBar />
          </Grid>
          <Grid item sm={10.5} style={{ padding: "0 10px 10px 10px" }}>
            {children}
          </Grid>
        </Grid>
      </div>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
}
