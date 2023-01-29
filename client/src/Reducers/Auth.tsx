import { IAuthStateContext } from "../Data/interfaces/IAuthentication";
import { AuthAction } from "../Data/types/Auth";
import CookieService from "../Services/CookieService";

export default function authReducer(
  authState: IAuthStateContext,
  action: AuthAction,
) {
  switch (action.type) {
    case "login": {
      return (authState = {
        ...authState,
        ...action.currentUser,
      });
    }
    case "changeLanguage": {
      return (authState = {
        ...authState,
        language: action.language,
      });
    }
    case "logout": {
      CookieService.removeUserObj();
      return {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        token: "",
        language: "",
        loading: false,
      };
    }
    case "loading": {
      return (authState = {
        ...authState,
        loading: action.loading,
      });
    }
    default:
      return authState;
  }
}
