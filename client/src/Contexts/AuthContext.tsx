import { createContext, useReducer } from "react";
import {
  AuthProviderProps,
  IAuthStateContext,
  IUser,
} from "../Data/interfaces/IAuthentication";
import { AuthContextType } from "../Data/types/Auth";
import authReducer from "../Reducers/Auth";

const initialState: IAuthStateContext | null = null;

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthPovider({ children }: AuthProviderProps) {
  const [authState, dispatch] = useReducer(
    authReducer,
    initialState as IAuthStateContext,
  );

  function login(currentUser: IUser) {
    dispatch({ type: "login", currentUser: currentUser });
  }

  function changeLanguage(language: string) {
    dispatch({ type: "changeLanguage", language: language });
  }

  function logout() {
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
