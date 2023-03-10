import { Grid } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tenantsFormLabels } from "../../../../Assets/Create";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { ITenant } from "../../../../Data/interfaces/ITenant";
import { IErrosListObject } from "../../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../../Data/types/Auth";
import { getSubmitFormValues } from "../../../../Services/Global";
import Date from "../../../Global/FormComponents/Date";
import Input from "../../../Global/FormComponents/Input";
import EditButtons from "../EditButtons";

interface TenantPartProps {
  editTenant: ITenant;
}

export default function EditTenant({ editTenant }: TenantPartProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(tenantsFormLabels.map(() => createRef()));
  const navigate = useNavigate();
  const onSave = () => {
    const [formValues, errorList, isFormPrroper] = getSubmitFormValues(
      tenantsFormLabels,
      refs,
    );
    if (isFormPrroper) {
      setErrorList({});
      console.log(formValues);
    } else {
      setErrorList(errorList as IErrosListObject);
    }
  };

  const onCancel = () => {
    navigate("/");
  };

  const title = "פרטי הדייר";
  return (
    <>
      <div className="sub-page-title">{title}</div>
      <Grid container spacing={3}>
        {tenantsFormLabels.map((item, index) => (
          <Grid item sm={item.gridSize} className="mb-2" key={item.en_label}>
            {item.type.fieldType === "date" ? (
              <Date
                label={item[`${authState.language}_label`]}
                value={editTenant[item.key]}
                ref={refs.current[index]}
                errorComment={errorList[item.key]}
              />
            ) : (
              <Input
                label={item[`${authState.language}_label`]}
                disabled={false}
                value={editTenant[item.key]}
                required={true}
                textType={"text"}
                error={errorList[item.key]}
                ref={refs.current[index]}
              />
            )}
          </Grid>
        ))}
      </Grid>
      <div className="mt-5 d-flex justify-content-center">
        <EditButtons onSave={onSave} onCancel={onCancel} />
      </div>
    </>
  );
}
