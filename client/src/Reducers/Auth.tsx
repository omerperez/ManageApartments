import { IAuthContext } from "../Data/interfaces/IUser";
import { AuthAction } from "../Data/types/Auth";

export default function authReducer(
  authState: IAuthContext,
  action: AuthAction,
) {
  switch (action.type) {
    case "login": {
      console.log(action.currentUser);
      return {
        ...authState,
        ...action.currentUser,
      };
    }
    case "changeLanguage": {
      return {
        ...authState,
        language: action.language,
      };
    }
    case "logout": {
      return {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        language: "",
        loading: false,
      };
    }
    case "loading": {
      return {
        ...authState,
        loading: action.loading,
      };
    }
    default:
      return authState;
  }
}
