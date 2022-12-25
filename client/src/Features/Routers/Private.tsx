import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { AuthContextType } from "../../Data/types/Auth";
import LanguageBtn from "../../Layout/LanguageBtn";
import Loading from "../../Layout/Loading";
import LogoutBtn from "../../Layout/LogoutBtn";
import SideBar from "../../Layout/SideBar";
import CookieService from "../../Services/CookieService";
import { verifyToken } from "../../Services/HttpService/AuthService";

export default function PrivateRouter({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { authState, login, logout } = useContext(
    AuthContext,
  ) as AuthContextType;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // const verifyUser = async () => {
    const token = CookieService.getToken();
    if (token) {
      verifyToken(token)
        .then((data) => {
          if (data.userId === CookieService.getUserId()) {
            login({
              mobile: data.userId,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              language: "he",
            });
          } else {
            logout();
          }
        })
        .then(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return authState.mobile !== "" ? (
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
    <Navigate to="signin" />
  );
}
