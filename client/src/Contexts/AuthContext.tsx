import { createContext, useEffect, useReducer } from "react";
import { IAuthContext } from "../Data/interfaces/IUser";
import { AuthContextType } from "../Data/types/Auth";
import authReducer from "../Reducers/Auth";

const initialState: IAuthContext = {
  id: "",
  firstName: "",
  lastName: "",
  loading: true,
  email: "",
  mobile: "",
  token: "",
  language: "",
};

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: JSX.Element;
}

export default function AuthPovider({ children }: AuthProviderProps) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (!authState.language) {
      let language = "en";
      try {
        const item = window.localStorage.getItem("language");
        language = item ? JSON.parse(item) : "en";
      } catch (error) {
        console.log(error);
      }
      dispatch({
        type: "changeLanguage",
        language: language,
      });
    }
  }, []);

  function login(id: string) {
    dispatch({ type: "login", id: id });
  }

  function changeUser(firstName: string, lastName: string, mobile: string) {
    dispatch({
      type: "changeUser",
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
    });
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
    changeUser: changeUser,
    changeLanguage: changeLanguage,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthPovider, AuthContext, initialState };
