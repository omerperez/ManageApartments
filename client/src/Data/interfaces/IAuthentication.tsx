interface IUser {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  token: string;
  language: string;
}

interface AuthProviderProps {
  children: JSX.Element;
}

interface IAuthStateContext extends IUser {
  loading: boolean;
}

export type { IUser, AuthProviderProps, IAuthStateContext };
