import { Grid } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { tenantsFormLabels } from "../../../Assets/Create";
import { AuthContext } from "../../../Contexts/AuthContext";
import { CreateTenantDto } from "../../../Data/interfaces/dto/CreateTenantt.dto";
import { ITenantCreateForm } from "../../../Data/interfaces/Form.interface";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import CreateFormLayout from "../../../Layout/CreateFormLayout";
import { createTenant } from "../../../Services/Api/ApartmentApi";
import {
  getSelectList,
  getTenantFormObject,
} from "../../../Services/FormService";
import { getSubmitFormValues } from "../../../Services/Global";
import UploadPDF from "../../Delete/CreateDelete/ManageFiles/UploadPDF";
import Date from "../../Global/FormComponents/Date";
import Input from "../../Global/FormComponents/Input";
import Select from "../../Global/FormComponents/Select";

interface CreateTenantProps {
  apartmentId: string;
  onCancel?: () => void;
}
export default function CreateTenant({
  apartmentId,
  onCancel,
}: CreateTenantProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(tenantsFormLabels.map(() => createRef()));
  const [tenant, setTenant] = useState<ITenantCreateForm | null>(null);
  const [document, setDocument] = useState<File | null>(null);

  const onSubmit = () => {
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      tenantsFormLabels,
      refs,
    );
    if (isFormPropper && document) {
      setErrorList({});
      const values = formValues as { [key: string]: string };
      const tenantData: ITenantCreateForm = getTenantFormObject(values);
      createTenant(
        {
          ...tenantData,
          apartment: apartmentId,
          owner: "0522520484",
        } as CreateTenantDto,
        document,
      ).then((response) => {
        console.log(response);
      });
    } else {
      setErrorList(errorList as IErrosListObject);
    }
  };

  function getDocumentError() {
    if (document || Object.keys(errorList).length === 0) {
      return "";
    }
    return "בבקשה צרף חוזה";
  }
  const language = authState.language ?? "he";
  const CREATE_TENANT_TITLE = "פרטי הדייר";
  return (
    <CreateFormLayout
      title={CREATE_TENANT_TITLE}
      secondPart={
        <>
          <UploadPDF pdf={document} setPdf={setDocument} />
          {<div className="input-error fs-5 mt-2">{getDocumentError()}</div>}
        </>
      }
      saveBtnText={"הוסף דייר"}
      onSubmit={onSubmit}
      onCancel={onCancel ? onCancel : () => {}}
    >
      <Grid container spacing={1.5}>
        {tenantsFormLabels.map((item, index) => (
          <Grid item sm={item.gridSize} key={item.en_label}>
            {item.type.fieldType === "date" ? (
              <Date
                label={item[`${language}_label`]}
                value={""}
                ref={refs.current[index]}
                errorComment={errorList[item.key]}
              />
            ) : item.type.fieldType === "select" ? (
              <Select
                label={item[`${language}_label`]}
                value={""}
                error={errorList[item.key]}
                disabled={false}
                list={getSelectList(item)}
                ref={refs.current[index]}
              />
            ) : (
              <Input
                label={item[`${language}_label`]}
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
    </CreateFormLayout>
  );
}
