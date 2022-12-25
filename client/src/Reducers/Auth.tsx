import { tempUser } from "../Assets/StaticData";
import { initialState } from "../Contexts/AuthContext";
import { IAuthContext } from "../Data/interfaces/IUser";
import { AuthAction } from "../Data/types/Auth";
import { CookieService } from "../Services/CookieService";

export default function authReducer(
  authState: IAuthContext,
  action: AuthAction,
) {
  switch (action.type) {
    case "login": {
      CookieService.setUserObj(tempUser);
      return {
        ...authState,
        id: action.id,
      };
    }
    case "changeUser": {
      return {
        ...authState,
        firstName: action.firstName,
        lastName: action.lastName,
        mobile: action.mobile,
      };
    }
    case "changeLanguage": {
      return {
        ...authState,
        language: action.language,
      };
    }
    case "logout": {
      CookieService.removeUserObj();
      return {
        ...initialState,
      };
    }
    case "loading": {
      return {
        ...authState,
        loading: action.loading,
      };
    }
    default:
      return authState as IAuthContext;
  }
}
