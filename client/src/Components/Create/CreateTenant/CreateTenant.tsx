import { Grid } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tenantsFormLabels } from "../../../Assets/Create";
import { AuthContext } from "../../../Contexts/AuthContext";
import { CreateTenantDto } from "../../../Data/interfaces/dto/CreateTenantt.dto";
import { ITenantCreateForm } from "../../../Data/interfaces/Form.interface";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import CreateFormLayout from "../../../Layout/CreateFormLayout";
import Loading from "../../../Layout/Loading";
import {
  getSelectList,
  getTenantFormObject,
} from "../../../Services/FormService";
import { getSubmitFormValues } from "../../../Services/Global";
import UploadPDF from "../../Delete/CreateDelete/ManageFiles/UploadPDF";
import Date from "../../Global/FormComponents/Date";
import Input from "../../Global/FormComponents/Input";
import Select from "../../Global/FormComponents/Select";

// Constans
const CREATE_TENANT_TITLE = "פרטי הדייר";
const EMPTY_DOC_ERROR = "בבקשה צרף חוזה";
const CREATE_TENANT_LOADING = "יוצר דייר...";
const ADD_TENANT = "הוסף דייר";

interface CreateTenantProps {
  apartmentId: string;
  onCancel?: () => void;
}
export default function CreateTenant({
  apartmentId,
  onCancel,
}: CreateTenantProps) {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;

  const language = authState.language ?? "he";

  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(tenantsFormLabels.map(() => createRef()));
  const [document, setDocument] = useState<File | null>(null);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      tenantsFormLabels,
      refs,
    );
    if (isFormPropper && document) {
      setCreateLoading(true);
      setErrorList({});
      const values = formValues as { [key: string]: string };
      const tenantData: ITenantCreateForm = getTenantFormObject(values);
      const TenantServiceApi = (await import("../../../Services/Api/TenantApi"))
        .default;
      TenantServiceApi.createTenant(
        {
          ...tenantData,
          apartment: apartmentId,
          owner: authState.mobile,
        } as CreateTenantDto,
        document,
      ).then(() => {
        setCreateLoading(false);
        setLoading(true);
        return navigate(`/apartment?apartmentId=${apartmentId}`);
      });
    } else {
      setErrorList(errorList as IErrosListObject);
    }
  };

  function getDocumentError() {
    if (document || Object.keys(errorList).length === 0) {
      return "";
    }
    return EMPTY_DOC_ERROR;
  }

  if (createLoading) {
    return <Loading text={CREATE_TENANT_LOADING} />;
  }

  return (
    <CreateFormLayout
      title={CREATE_TENANT_TITLE}
      secondPart={
        <>
          <UploadPDF pdf={document} setPdf={setDocument} />
          {<div className="input-error fs-5 mt-2">{getDocumentError()}</div>}
        </>
      }
      saveBtnText={ADD_TENANT}
      onSubmit={onSubmit}
      onCancel={onCancel ? onCancel : () => {}}
    >
      <Grid container spacing={1.5} className="padding-creates-form">
        {tenantsFormLabels.map((item, index) => (
          <Grid
            item
            xs={item.gridSize >= 4 ? 12 : 6}
            sm={item.gridSize}
            key={item.en_label}
          >
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
