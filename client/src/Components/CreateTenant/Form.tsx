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
import { ITenantCreateForm } from "../../Data/interfaces/Form.interface";
import { IErrosListObject } from "../../Data/interfaces/IValidation";
import { AuthContextType } from "../../Data/types/Auth";
import {
  getFieldValue,
  getSelectList,
  getTenantFormObject,
} from "../../Services/FormService";
import { getSubmitFormValues } from "../../Services/Global";
import StepperBtns from "../Create/Stepper/StepperButtons";
import Date from "../Global/FormComponents/Date";
import Input from "../Global/FormComponents/Input";
import Select from "../Global/FormComponents/Select";

interface TenantFormProps {
  setNewTenant: Dispatch<SetStateAction<ITenantCreateForm | null>>;
}

export default function CreateTenantForm({ setNewTenant }: TenantFormProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(tenantsFormLabels.map(() => createRef()));

  const handleSubmit = () => {
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      tenantsFormLabels,
      refs,
    );
    if (isFormPropper) {
      setErrorList({});
      const values = formValues as { [key: string]: string };
      const tenantData: ITenantCreateForm = getTenantFormObject(values);
      setNewTenant(tenantData);
    } else {
      setErrorList(errorList as IErrosListObject);
    }
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
                  value={""}
                  ref={refs.current[index]}
                  errorComment={errorList[item.key]}
                />
              ) : item.type.fieldType === "select" ? (
                <Select
                  label={item[`${authState.language}_label`]}
                  value={""}
                  error={errorList[item.key]}
                  disabled={false}
                  list={getSelectList(item)}
                  ref={refs.current[index]}
                />
              ) : (
                <Input
                  label={item[`${authState.language}_label`]}
                  disabled={false}
                  value={""}
                  required={true}
                  textType={"text"}
                  error={errorList[item.key]}
                  ref={refs.current[index]}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
