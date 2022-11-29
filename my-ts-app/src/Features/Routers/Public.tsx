import React, { useContext, useEffect, ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import Loading from "../../Layout/Loading";
import { CookieService } from "../../Services/CookieService";

export default function PublicRouter({ children }: { children?: ReactNode }) {
  const { state, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  const isUserConnected = (userId: string) => {
    return userId !== "" && userId !== undefined;
  };
  useEffect(() => {
    const userId = CookieService.getUserId();
    if ((state.id === undefined || state.id === "") && userId !== undefined) {
      dispatch({ type: "login", id: userId });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (loading) return <Loading />;

  return isUserConnected(state.id) ? (
    <Navigate to="/" />
  ) : (
    <div>{children}</div>
  );
}
