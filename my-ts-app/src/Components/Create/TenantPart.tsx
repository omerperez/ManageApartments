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
import { tenantsFormLabels } from "../../Assets/Create";
import { AuthContext } from "../../Contexts/AuthContext";
import { ITenant } from "../../Data/interfaces/ITenant";
import { AuthContextType } from "../../Data/types/Auth";
import {
  getFieldsErrorStatus,
  isFormFieldsErrors,
} from "../../Services/Global";
import Date from "../Global/FormComponents/Date";
import Input from "../Global/FormComponents/Input";
import StepperBtns from "./StepperBtns";

interface TenantPartProps {
  // editTenant?: ITenant | null;
  editTenant?: ITenant;
  isEditTenant?: boolean;
  setStep?: Dispatch<SetStateAction<number>>;
}
export default function TenantPart({
  editTenant,
  isEditTenant,
  setStep,
}: TenantPartProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [errorList, setErrorList] = useState<{ [key: string]: boolean }>({});
  const refs: Ref<any> = useRef(tenantsFormLabels.map(() => createRef()));

  const handleClickNext = () => {
    const list = getFieldsErrorStatus(tenantsFormLabels, refs);
    if (isFormFieldsErrors(list)) {
      setErrorList(list);
      setStep && setStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setErrorList({});
      // setStep && setStep((prevActiveStep) => prevActiveStep + 1);
      // changeStepStatus("tenant", true);
    }
  };

  const handleClickBack = () => {
    setStep && setStep((prevActiveStep) => prevActiveStep - 1);
  };

  const title = "פרטי הדייר";
  return (
    <>
      <div style={{ height: "80%" }}>
        <div className="sub-page-title">{title}</div>
        <Grid container spacing={1.5}>
          {tenantsFormLabels.map((item, index) => (
            <Grid item sm={item.gridSize} className="mb-2" key={item.en_label}>
              {item.type === "date" ? (
                <Date
                  cancelLabel={false}
                  label={item[`${authState.language}_label`]}
                  disabled={false}
                  value={
                    editTenant
                      ? `${editTenant[item.name as keyof ITenant]}`
                      : ""
                  }
                  ref={refs.current[index]}
                  errorComment={
                    errorList[item.name] === false ? item.error : ""
                  }
                />
              ) : (
                <Input
                  label={item[`${authState.language}_label`]}
                  disabled={false}
                  value={
                    editTenant
                      ? `${editTenant[item.name as keyof ITenant]}`
                      : ""
                  }
                  required={true}
                  textType={"text"}
                  error={errorList[item.name] === false ? item.error : ""}
                  ref={refs.current[index]}
                />
              )}
              {/* {showCorrectFieldType(item)} */}
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
