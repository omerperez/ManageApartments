import { Grid } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { tenantsFormLabels } from "../../../Assets/Create";
import { AuthContext } from "../../../Contexts/AuthContext";
import { PrivateContext } from "../../../Contexts/Private";
import { ITenant } from "../../../Data/interfaces/ITenant";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import { PrivateContextType } from "../../../Data/types/Private";
import {
  getFormFieldError,
  getTenantValue,
} from "../../../Services/FormService";
import {
  getFieldsErrorStatus,
  isFormFieldsErrors,
} from "../../../Services/Global";
import Date from "../../Global/FormComponents/Date";
import Input from "../../Global/FormComponents/Input";
import StepperBtns from "../Stepper/StepperButtons";

interface TenantFormProps {
  editTenant?: ITenant;
  isEditTenant?: boolean;
}

export default function TenantForm({
  editTenant,
  isEditTenant,
}: TenantFormProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const { privateState, setStep } = useContext(
    PrivateContext,
  ) as PrivateContextType;
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(tenantsFormLabels.map(() => createRef()));

  const handleClickNext = () => {
    const list = getFieldsErrorStatus(tenantsFormLabels, refs);
    if (isFormFieldsErrors(list)) {
      setErrorList(list);
    } else {
      setErrorList({});
      setStep(privateState.activeStep + 1);
    }
  };

  const handleClickBack = () => {
    setStep(privateState.activeStep - 1);
  };

  const title = "פרטי הדייר";
  return (
    <>
      <div className="tenant-form">
        <div className="sub-page-title">{title}</div>
        <Grid container spacing={1.5}>
          {tenantsFormLabels.map((item, index) => (
            <Grid item sm={item.gridSize} className="mb-2" key={item.en_label}>
              {item.type === "date" ? (
                <Date
                  label={item[`${authState.language}_label`]}
                  value={getTenantValue(editTenant, item.name)}
                  ref={refs.current[index]}
                  errorComment={getFormFieldError(item, errorList)}
                />
              ) : (
                <Input
                  label={item[`${authState.language}_label`]}
                  disabled={false}
                  value={getTenantValue(editTenant, item.name)}
                  required={true}
                  textType={"text"}
                  error={getFormFieldError(item, errorList)}
                  ref={refs.current[index]}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </div>
      {!isEditTenant && (
        <StepperBtns next={handleClickNext} back={handleClickBack} />
      )}
    </>
  );
}
