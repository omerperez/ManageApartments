import { Button } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apartmentLogo } from "../Assets/StaticImages";
import Alert from "../Components/Global/Alert";
import Input from "../Components/Global/FormComponents/Input";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Auth.css";
import ThemeStyleRTL from "../Layout/ThemeStyleRTL";
import { getRefValue } from "../Services/Global";
import { loginRequest } from "../Services/HttpService/AuthService";
import { SignInLabelsForm } from "../Services/Translate/SignIn";

export default function SignIn() {
  const { authState, login, changeUser } = useContext(
    AuthContext,
  ) as AuthContextType;
  const [error, setError] = useState<string>("");
  const refs: Ref<any> = useRef(SignInLabelsForm.map(() => createRef()));

  const handleClickLogin = async () => {
    const mobile = getRefValue(refs, 0);
    const password = getRefValue(refs, 1);
    if (!mobile || !password) {
      return setError("אנא מלא את השדות כראוי");
    }
    if (mobile.length < 10 || password.length < 6)
      return setError("מספר נייד / סיסמא שגואיים. אנא נסה בשנית.");
    else {
      const response = await loginRequest(mobile, password);
      console.log(response);
      setError("");
      login(response.mobile);
      changeUser(response.firstName, response.lastName, response.mobile);
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
            <div className="mt-2">
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
