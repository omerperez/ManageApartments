import { IAuthStateContext, IUser } from "../interfaces/IAuthentication";

type AuthAction =
    | { type: "logout" }
    | { type: "loading", loading: boolean }
    | { type: "login"; currentUser: IUser }
    | { type: "changeLanguage"; language: string }

type AuthContextType = {
    authState: IAuthStateContext;
    login: (currentUser: IUser) => void;
    setLoading: (loading: boolean) => void;
    changeLanguage: (language: string) => void;
    logout: () => void;
};

export type { AuthAction, AuthContextType };
