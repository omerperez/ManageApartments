import React, { useContext, useEffect, ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { AuthContextType } from "../../Data/types/Auth";
import Loading from "../../Layout/Loading";
import { CookieService } from "../../Services/CookieService";

export default function PublicRouter({ children }: { children?: ReactNode }) {
  const { authState, login } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState<boolean>(true);

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
    <Navigate to="/" />
  ) : (
    <div>{children}</div>
  );
}
