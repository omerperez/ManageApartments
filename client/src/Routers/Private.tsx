import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import Loading from "../Layout/Loading";
import SideBar from "../Layout/Navigation/SideBar";
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
  }, [authState]);

  if (loading) return <Loading />;

  return authState.token ? (
    <div className="router-layout project-font">
      <div className={`home-layout-${authState.language}`}>
        <Grid container>
          <SideBar />
          <Grid item sm={10.5} className="private-route-children">
            {children}
          </Grid>
        </Grid>
      </div>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
}
