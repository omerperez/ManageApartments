import { Button, Grid } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apartmentLogo } from "../Assets/StaticImages";
import Input from "../Components/Global/FormComponents/Input";
import { AuthContext } from "../Contexts/AuthContext";
import { IUserReq } from "../Data/interfaces/Http";
import { IErrosListObject } from "../Data/interfaces/IValidation";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Auth.css";
import ThemeStyleRTL from "../Layout/ThemeStyleRTL";
import { registerRequest } from "../Services/Api/AuthApi";
import { getInputType } from "../Services/FormService";
import { getSubmitFormValues } from "../Services/Global";
import { SignUpLabelsForm } from "../Services/Translate/SignIn";

export default function SignUp() {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const navigate = useNavigate();
  const refs: Ref<any> = useRef(SignUpLabelsForm.map(() => createRef()));

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
                  label={item[`${language}_label`]}
                  textType={getInputType(item)}
                  value=""
                  required={true}
                  error={errorList[item.key]}
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
