interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  token: string;
  language: string;
}

interface IAuthContext extends IUser {
  loading: boolean;
}

export type { IUser, IAuthContext };
