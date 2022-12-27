import { IAuthContext, IUser } from "../interfaces/IUser";

type AuthAction =
    | { type: "logout" | "success" | "error" }
    | { type: "loading", loading: boolean }
    | { type: "login"; currentUser: IUser }
    | { type: "changeLanguage"; language: string }

type AuthContextType = {
    authState: IAuthContext;
    login: (currentUser: IUser) => void;
    setLoading: (loading: boolean) => void;
    changeLanguage: (language: string) => void;
    logout: () => void;
};

export type { AuthAction, AuthContextType };
