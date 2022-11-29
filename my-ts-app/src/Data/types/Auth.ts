type AuthAction =
    | { type: "logout" | "success" | "error" }
    | { type: "login"; id: string }
    | { type: "changeLanguage"; language: string }
    | { type: "changeUser"; firstName: string; lastName: string; mobile: string };

export type { AuthAction }