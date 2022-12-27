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

export default function PrivateRouter({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { authState, login, logout } = useContext(
    AuthContext,
  ) as AuthContextType;
  const [loading, setLoading] = useState<boolean>(true);
  const [isConnect, setIsConnect] = useState<boolean>(true);

  useEffect(() => {
    const isUserConnect = async () => {
      const token = CookieService.getToken();
      if (token) {
        try {
          const data = await verifyToken(token);
          if (data.userId === CookieService.getUserId()) {
            login({
              mobile: data.userId,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              language: "he",
            });
            setIsConnect(true);
          } else {
            logout();
            setIsConnect(false);
          }
          setLoading(false);
        } catch (e) {
          setLoading(false);
          logout();
        }
      }
    };
    isUserConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return isConnect ? (
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
