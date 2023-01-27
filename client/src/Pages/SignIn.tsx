import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  createRef,
  KeyboardEvent,
  Ref,
  useContext,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { loginLogo, loginLogoError } from "../Assets/StaticImages";
import Input from "../Components/Global/FormComponents/Input";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Auth.css";
import { AuthInputErrorMui, AuthInputMui } from "../Layout/Mui/Auth";
import { loginRequest } from "../Services/Api/AuthApi";
import CookieService from "../Services/CookieService";
import { getInputType } from "../Services/FormService";
import { getRefValue } from "../Services/Global";
import { SignInLabelsForm } from "../Services/Translate/SignIn";

export default function SignIn() {
  const { login } = useContext(AuthContext) as AuthContextType;
  const [error, setError] = useState<string>("");
  const refs: Ref<any> = useRef(SignInLabelsForm.map(() => createRef()));

  // Constans
  const LOGIN_BUTTON_TEXT = "התחברות";
  const REGISTER_LINK_TEXT = "הרשמה";
  const SYSTEM_NAME = "Apartment Managment";
  const FILEDS_NOT_PROPPER_ERROR = "אנא מלא את השדות כראוי";
  const AUTH_FIELD_ERROR = "מספר נייד / סיסמא שגואיים. אנא נסה בשנית.";
  const SYSTEM_TITLE_AM = "AM";

  const handlePressLogin = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event && event.key === "Enter") {
      return handleClickLogin();
    }
  };

  const handleClickLogin = () => {
    const mobile = getRefValue(refs, 0);
    const password = getRefValue(refs, 1);
    if (!mobile || !password) {
      return setError(FILEDS_NOT_PROPPER_ERROR);
    }
    if (mobile.length < 10 || password.length < 6)
      return setError(AUTH_FIELD_ERROR);
    else {
      loginRequest(mobile, password).then((response) => {
        if (!response) {
          setError(AUTH_FIELD_ERROR);
        } else {
          CookieService.initUser(
            response.user.mobile,
            response.auth.accessToken,
          );
          login({
            ...response.user,
            token: response.auth.accessToken,
            language: "he",
          });
        }
      });
      return;
    }
  };

  return (
    <div className="login" onKeyDown={(event) => handlePressLogin(event)}>
      <div className="login-title">
        <div className="login-big-title">{SYSTEM_TITLE_AM}</div>
        {SYSTEM_NAME}
      </div>
      <div className="login-card">
        <div className="login-card-grid">
          <div className="text-center">
            <img src={error ? loginLogoError : loginLogo} alt="login" />
          </div>
          <div className="login-error">{error && <span>{error}</span>}</div>
          {SignInLabelsForm.map((item, index) => (
            <div className="input-auth" key={`signin-input${index}`}>
              <Input
                label={item.he_label}
                textType={getInputType(item)}
                value=""
                sx={error ? AuthInputErrorMui : AuthInputMui}
                required={true}
                ref={refs.current[index]}
              />
            </div>
          ))}
          <Button
            variant="contained"
            className="login-btn"
            fullWidth
            onClick={handleClickLogin}
          >
            {LOGIN_BUTTON_TEXT}
          </Button>
          <div className="auth-link-position">
            <Button
              variant="contained"
              className="auth-link-btn"
              startIcon={<ArrowBack className="auth-link-btn-icon" />}
            >
              <Link className="auth-link" to={"/signup"}>
                {REGISTER_LINK_TEXT}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
