import { Button, Grid } from "@mui/material";
import axios from "axios";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apartmentLogo } from "../Assets/StaticImages";
import Input from "../Components/Global/FormComponents/Input";
import { AuthContext } from "../Contexts/AuthContext";
import { IErrosListObject } from "../Data/interfaces/IValidation";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Auth.css";
import ThemeStyleRTL from "../Layout/ThemeStyleRTL";
import {
  getFieldsErrorStatus,
  getRefValue,
  isFormFieldsErrors,
} from "../Services/Global";
import { IUserReq, registerRequest } from "../Services/HttpService/AuthService";
import { SignUpLabelsForm } from "../Services/Translate/SignIn";

export default function SignUp() {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const navigate = useNavigate();
  const refs: Ref<any> = useRef(SignUpLabelsForm.map(() => createRef()));

  const handleSubmit = async () => {
    const list = getFieldsErrorStatus(SignUpLabelsForm, refs);
    if (isFormFieldsErrors(list)) {
      setErrorList(list);
    } else {
      setErrorList({});
      const user: IUserReq = {
        mobile: getRefValue(refs, 3),
        firstName: getRefValue(refs, 0),
        lastName: getRefValue(refs, 1),
        email: getRefValue(refs, 2),
        password: getRefValue(refs, 4),
      };
      const isStatusPropper = await registerRequest(user);
      if (isStatusPropper) return navigate("/signin");
    }
  };

  return (
    <div className="login-page">
      <div className="register-card">
        <div className="text-center">
          <img src={apartmentLogo} alt="Login" width={150} height={150} />
        </div>
        <ThemeStyleRTL>
          <Grid container spacing={1} className="text-end">
            {SignUpLabelsForm.map((item, index) => (
              <Grid
                item
                sm={item.gridSize}
                key={`grid-signup-form${item.en_label}`}
              >
                <Input
                  label={item[`${authState.language}_label`]}
                  textType={item.textType ?? "text"}
                  value=""
                  required={true}
                  error={errorList[item.name] === false ? item.error : ""}
                  ref={refs.current[index]}
                />
              </Grid>
            ))}
          </Grid>
        </ThemeStyleRTL>
        <div className="btn-pos m-2 mt-4">
          <Button
            variant="contained"
            className="login-btn"
            fullWidth
            onClick={handleSubmit}
          >
            התחבר/י
          </Button>
          <div className="text-center mt-4">
            <Link to={"/signin"}>התחברות</Link>
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
//     {item[`${authState.language ? "en" : "he"}_label`]}
//   </FormLabel>
//   <div className="auth-input">
//     <TextField
//       fullWidth
//       required
//       variant="outlined"
//       id="employee-number"
//       label={item[`${authState.language ? "en" : "he"}_label`]}
//       type={item.type}
//       value={values[item.name]}
//       name={item.name}
//       // onKeyDown={handlePressEnter}
//       onChange={(e) => handleChange(e, item.name)}
//     />
//   </div>
// </FormControl>
