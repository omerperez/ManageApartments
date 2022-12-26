import { Button } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apartmentLogo } from "../Assets/StaticImages";
import Alert from "../Components/Global/Alert";
import Input from "../Components/Global/FormComponents/Input";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Auth.css";
import CookieService from "../Services/CookieService";
import { getRefValue } from "../Services/Global";
import { loginRequest } from "../Services/Api/AuthApi";
import { SignInLabelsForm } from "../Services/Translate/SignIn";

export default function SignIn() {
  const { login } = useContext(AuthContext) as AuthContextType;
  const [error, setError] = useState<string>("");
  const refs: Ref<any> = useRef(SignInLabelsForm.map(() => createRef()));

  const handleClickLogin = () => {
    const mobile = getRefValue(refs, 0);
    const password = getRefValue(refs, 1);
    if (!mobile || !password) {
      return setError("אנא מלא את השדות כראוי");
    }
    if (mobile.length < 10 || password.length < 6)
      return setError("מספר נייד / סיסמא שגואיים. אנא נסה בשנית.");
    else {
      loginRequest(mobile, password).then((response) => {
        console.log(response);
        if (!response) {
          setError("שם משתמה או סיסמא שגויים אנא נסה שנית");
        } else {
          CookieService.initUser(response.user.mobile, response.accessToken);
          login({
            ...response.user,
            language: "he",
          });
        }
      });
      return;
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="text-center">
          <img src={apartmentLogo} alt="Login" width={350} height={200} />
        </div>
        <div className="text-end">
          {error && <Alert text={error} />}
          {SignInLabelsForm.map((item, index) => (
            <div className="mt-2" key={`signin-input${index}`}>
              <Input
                label={item.he_label}
                textType={item.textType}
                value=""
                required={true}
                ref={refs.current[index]}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button
            variant="contained"
            className="login-btn"
            fullWidth
            onClick={handleClickLogin}
          >
            התחבר/י
          </Button>
          <div className="text-center mt-4">
            <Link to={"/signup"}>הרשמה</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
