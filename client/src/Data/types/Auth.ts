import { IAuthContext, IUser } from "../interfaces/IUser";

type AuthAction =
    | { type: "logout" | "success" | "error" }
    | { type: "loading", loading: boolean }
    | { type: "login"; currentUser: IUser }
    | { type: "changeLanguage"; language: string }
    // | { type: "changeUser"; firstName: string; lastName: string; mobile: string };

type AuthContextType = {
    authState: IAuthContext;
    login: (currentUser: IUser) => void;
    setLoading: (loading: boolean) => void;
    // changeUser: (firstName: string, lastName: string, mobile: string) => void;
    changeLanguage: (language: string) => void;
    logout: () => void;
};

export type { AuthAction, AuthContextType };
