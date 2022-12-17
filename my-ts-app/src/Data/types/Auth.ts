import { IUser } from "../interfaces/IUser";

type AuthAction =
    | { type: "logout" | "success" | "error" }
    | { type: "login"; id: string }
    | { type: "changeLanguage"; language: string }
    | { type: "changeUser"; firstName: string; lastName: string; mobile: string };

type AuthContextType = {
    authState: IUser;
    login: (id: string) => void;
    changeUser: (firstName: string, lastName: string, mobile: string) => void;
    changeLanguage: (language: string) => void;
    logout: () => void;
};

export type { AuthAction, AuthContextType };