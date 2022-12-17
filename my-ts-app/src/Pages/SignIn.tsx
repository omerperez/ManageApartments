import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { logoImage } from "../Assets/StaticImages";
import ThemeStyleRTL from "../Layout/ThemeStyleRTL";
import { AuthContext } from "../Contexts/AuthContext";
import "../Layout/CSS/Auth.css";
import { SignInLabelsForm } from "../Services/Translate/SignIn";
import { AuthContextType } from "../Data/types/Auth";

export default function SignIn() {
  const [values, setValues] = useState({
    mobile: "",
    password: "",
  });
  const { authState, login, changeUser } = useContext(
    AuthContext,
  ) as AuthContextType;
  const [error, setError] = useState<string>("");

  const handleChange = (e: any, name: string) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleClickLogin = () => {
    if (values.mobile.length < 10 || values.password.length < 6)
      return setError("מספר נייד / סיסמא שגואיים. אנא נסה בשנית.");
    else {
      setError("");
      login(values.mobile);
      changeUser("Nir", "Perez", "0522520484");
      return;
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="text-center">
          <img src={logoImage} alt="Login" width={300} />
        </div>
        <ThemeStyleRTL>
          {error && (
            <Alert className="global-font" severity="error">
              {error}
            </Alert>
          )}
          <FormControl className="w-100">
            {SignInLabelsForm.map((item, index) => (
              <>
                <FormLabel
                  className="label-title"
                  id={"form-title-label-employee-number"}
                >
                  {item[`${authState.language ? "en" : "he"}_label`]}
                </FormLabel>
                <div className="auth-input">
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    id="employee-number"
                    label={item[`${authState.language ? "en" : "he"}_label`]}
                    type={item.type}
                    value={values[item.name]}
                    name={item.name}
                    // onKeyDown={handlePressEnter}
                    onChange={(e) => handleChange(e, item.name)}
                  />
                </div>
              </>
            ))}
          </FormControl>
        </ThemeStyleRTL>
        <div className="btn-pos m-2 mt-4">
          <Button
            variant="contained"
            className="login-btn"
            fullWidth
            onClick={handleClickLogin}
          >
            התחבר/י
          </Button>
        </div>
      </div>
    </div>
  );
}
