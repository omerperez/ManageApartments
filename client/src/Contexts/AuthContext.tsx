import { createContext, useReducer } from "react";
import { IAuthContext, IUser } from "../Data/interfaces/IUser";
import { AuthContextType } from "../Data/types/Auth";
import authReducer from "../Reducers/Auth";
import CookieService from "../Services/CookieService";

const initialState: IAuthContext = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  language: "",
  loading: false,
};

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: JSX.Element;
}

export default function AuthPovider({ children }: AuthProviderProps) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  function login(currentUser: IUser) {
    dispatch({ type: "login", currentUser: currentUser });
  }

  function changeLanguage(language: string) {
    dispatch({ type: "changeLanguage", language: language });
  }

  function logout() {
    CookieService.removeUserObj();
    dispatch({ type: "logout" });
  }

  function setLoading(loading: boolean) {
    dispatch({ type: "loading", loading: loading });
  }

  const value = {
    authState: authState,
    login: login,
    setLoading: setLoading,
    changeLanguage: changeLanguage,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthPovider, AuthContext, initialState };
