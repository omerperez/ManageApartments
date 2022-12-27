import { Grid } from "@mui/material";
import {
  createRef,
  Dispatch,
  Ref,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { tenantsFormLabels } from "../../../Assets/Create";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ITenant } from "../../../Data/interfaces/ITenant";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import {
  getFormFieldError,
  getSelectList,
  getTenantValue,
} from "../../../Services/FormService";
import {
  getFieldsErrorStatus,
  isFormFieldsErrors,
} from "../../../Services/Global";
import Date from "../../Global/FormComponents/Date";
import Input from "../../Global/FormComponents/Input";
import Select from "../../Global/FormComponents/Select";
import StepperBtns from "../Stepper/StepperButtons";

interface TenantFormProps {
  editTenant?: ITenant;
  isEditTenant?: boolean;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}

export default function TenantForm({
  editTenant,
  isEditTenant,
  setActiveStep,
}: TenantFormProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(tenantsFormLabels.map(() => createRef()));

  const handleClickNext = () => {
    const list = getFieldsErrorStatus(tenantsFormLabels, refs);
    if (isFormFieldsErrors(list)) {
      setErrorList(list);
    } else {
      setErrorList({});
      setActiveStep && setActiveStep(2);
    }
  };

  const handleClickBack = () => {
    setActiveStep && setActiveStep(0);
  };

  const title = "פרטי הדייר";
  return (
    <>
      <div className="tenant-form">
        <div className="sub-page-title">{title}</div>
        <Grid container spacing={5}>
          {tenantsFormLabels.map((item, index) => (
            <Grid item sm={item.gridSize} key={item.en_label}>
              {item.type.fieldType === "date" ? (
                <Date
                  label={item[`${authState.language}_label`]}
                  value={getTenantValue(editTenant, item.key)}
                  ref={refs.current[index]}
                  errorComment={getFormFieldError(item, errorList)}
                />
              ) : item.type.fieldType === "select" ? (
                <Select
                  label={item[`${authState.language}_label`]}
                  value={getTenantValue(editTenant, item.key)}
                  error={errorList[item.key] === false ? item.error : ""}
                  disabled={false}
                  list={getSelectList(item)}
                  ref={refs.current[index]}
                />
              ) : (
                <Input
                  label={item[`${authState.language}_label`]}
                  disabled={false}
                  value={getTenantValue(editTenant, item.key)}
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
        <StepperBtns
          next={handleClickNext}
          back={handleClickBack}
          activeStep={1}
        />
      )}
    </>
  );
}
