import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import CookieService from "../Services/CookieService";

export default function PublicRouter({ children }: { children?: ReactNode }) {
  const { authState } = useContext(AuthContext) as AuthContextType;

  if (authState?.token || CookieService.getToken()) {
    return <Navigate to="/home" />;
  }
  return <div>{children}</div>;
}
