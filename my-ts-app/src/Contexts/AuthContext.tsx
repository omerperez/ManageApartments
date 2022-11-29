import { createContext, Dispatch, useEffect, useReducer } from "react";
import { IUser } from "../Data/interfaces/IUser";
import { AuthAction } from "../Data/types/Auth";
import authReducer from "../Reducers/Auth";

const initialState: IUser = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  token: "",
  language: "",
};

const AuthContext = createContext<{
  state: IUser;
  dispatch: Dispatch<AuthAction>;
}>({ state: initialState, dispatch: () => null });

export default function AuthPovider({ children }: any) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
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
  }, []);

  const value = {
    state: authState,
    dispatch: dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthPovider, AuthContext, initialState };
