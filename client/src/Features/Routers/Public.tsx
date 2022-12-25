import { ReactNode, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { AuthContextType } from "../../Data/types/Auth";
import Loading from "../../Layout/Loading";
import { CookieService } from "../../Services/CookieService";

export default function PublicRouter({ children }: { children?: ReactNode }) {
  const { authState, login, setLoading } = useContext(
    AuthContext,
  ) as AuthContextType;

  const isUserConnected = (userId: string) => {
    return userId !== "" && userId !== undefined;
  };
  useEffect(() => {
    if (authState.loading) {
      const userId = CookieService.getUserId();
      if (
        (authState.id === undefined || authState.id === "") &&
        userId !== undefined
      ) {
        login(userId);
      }
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  if (authState.loading) return <Loading />;

  return isUserConnected(authState.id) ? (
    <Navigate to="/" />
  ) : (
    <div>{children}</div>
  );
}
