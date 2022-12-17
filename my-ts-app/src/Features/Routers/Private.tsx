import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SideBar from "../../Layout/SideBar";
import { AuthContext } from "../../Contexts/AuthContext";
import LanguageBtn from "../../Layout/LanguageBtn";
import Loading from "../../Layout/Loading";
import LogoutBtn from "../../Layout/LogoutBtn";
import { CookieService } from "../../Services/CookieService";
import { AuthContextType } from "../../Data/types/Auth";

export default function PrivateRouter({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const { authState, login } = useContext(AuthContext) as AuthContextType;

  const isUserConnected = (userId: string) => {
    return userId !== "" && userId !== undefined;
  };
  useEffect(() => {
    const userId = CookieService.getUserId();
    if (
      (authState.id === undefined || authState.id === "") &&
      userId !== undefined
    ) {
      login(userId);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  if (loading) return <Loading />;

  return isUserConnected(authState.id) ? (
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
