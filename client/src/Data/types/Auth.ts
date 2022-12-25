import { IAuthContext } from "../interfaces/IUser";

type AuthAction =
    | { type: "logout" | "success" | "error" }
    | { type: "loading", loading: boolean }
    | { type: "login"; id: string }
    | { type: "changeLanguage"; language: string }
    | { type: "changeUser"; firstName: string; lastName: string; mobile: string };

type AuthContextType = {
    authState: IAuthContext;
    login: (id: string) => void;
    setLoading: (loading: boolean) => void;
    changeUser: (firstName: string, lastName: string, mobile: string) => void;
    changeLanguage: (language: string) => void;
    logout: () => void;
};

export type { AuthAction, AuthContextType };
