import { ArrowBack } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginLogoError } from "../Assets/StaticImages";
import Input from "../Components/Global/FormComponents/Input";
import { AuthContext } from "../Contexts/AuthContext";
import { IUserReq } from "../Data/interfaces/Http";
import { IErrosListObject } from "../Data/interfaces/IValidation";
import { AuthContextType } from "../Data/types/Auth";
import useMobieDesign from "../Hooks/useMobile";
import "../Layout/CSS/Auth.css";
import { AuthInputErrorMui, AuthInputMui } from "../Layout/Mui/Auth";
import { registerRequest } from "../Services/Api/AuthApi";
import { getInputType } from "../Services/FormService";
import { getSubmitFormValues } from "../Services/Global";
import { SignUpLabelsForm } from "../Services/Translate/SignIn";

export default function SignUp() {
  const isMobileDesign = useMobieDesign();
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const navigate = useNavigate();
  const refs: Ref<any> = useRef(SignUpLabelsForm.map(() => createRef()));

  // Constans
  const LOGIN_BUTTON_TEXT = "התחברות";
  const REGISTER_LINK_TEXT = "הרשמה";
  const SYSTEM_NAME = "Apartment Managment";
  const SYSTEM_TITLE_AM = "AM";

  const handleSubmit = async () => {
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      SignUpLabelsForm,
      refs,
    );
    if (isFormPropper) {
      setErrorList({});
      const values = formValues as IErrosListObject;
      const dataRequest: IUserReq = {
        mobile: values.mobile,
        firstName: values.firsName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      const isStatusPropper = await registerRequest(dataRequest);
      if (isStatusPropper) return navigate("/signin");
    } else {
      setErrorList(errorList as IErrosListObject);
    }
  };

  const language = authState?.language ?? "he";

  return (
    <div className="register">
      <div className="login-title">
        {!isMobileDesign && (
          <>
            <div className="login-big-title">{SYSTEM_TITLE_AM}</div>
            {SYSTEM_NAME}
          </>
        )}
      </div>
      <div className="login-card">
        <div className="register-card-grid">
          <div className="text-center">
            <img src={loginLogoError} alt="register" />
            {isMobileDesign && <div className="mt-3">{SYSTEM_NAME}</div>}
          </div>
          <Grid container className="mt-md-4 mt-1">
            {SignUpLabelsForm.map((item, index) => (
              <Grid
                item
                md={item.gridSize}
                className="input-register"
                key={`grid-signup-form${item.en_label}`}
              >
                <Input
                  label={item[`${language}_label`]}
                  textType={getInputType(item)}
                  value=""
                  sx={errorList[item.key] ? AuthInputErrorMui : AuthInputMui}
                  error={errorList[item.key]}
                  required={true}
                  ref={refs.current[index]}
                />
              </Grid>
            ))}
          </Grid>
          <div className="input-register">
            <Button
              variant="contained"
              className="register-btn"
              fullWidth
              onClick={handleSubmit}
            >
              {REGISTER_LINK_TEXT}
            </Button>
          </div>
          <div className="auth-link-position">
            <Button
              variant="contained"
              className="auth-link-btn"
              startIcon={<ArrowBack className="auth-link-btn-icon" />}
            >
              <Link className="auth-link" to={"/signin"}>
                {LOGIN_BUTTON_TEXT}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// <FormControl className="w-100">
//   <FormLabel
//     className="label-title"
//     id={"form-title-label-employee-number"}
//   >
//     {item[`${language ? "en" : "he"}_label`]}
//   </FormLabel>
//   <div className="auth-input">
//     <TextField
//       fullWidth
//       required
//       variant="outlined"
//       id="employee-number"
//       label={item[`${language ? "en" : "he"}_label`]}
//       type={item.type}
//       value={values[item.name]}
//       name={item.name}
//       // onKeyDown={handlePressEnter}
//       onChange={(e) => handleChange(e, item.name)}
//     />
//   </div>
// </FormControl>
