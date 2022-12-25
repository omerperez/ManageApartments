interface IUser extends IUserProperties {
  language: string;
}

interface IUserProperties {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

interface IAuthContext extends IUser {
  loading: boolean;
}

export type { IUser, IAuthContext, IUserProperties };
