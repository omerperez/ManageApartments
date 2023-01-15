import { Grid } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { tenantsFormLabels } from "../../Assets/Create";
import { AuthContext } from "../../Contexts/AuthContext";
import { Tenant } from "../../Data/interfaces/entities/Tenant.entity";
import { ITenantCreateForm } from "../../Data/interfaces/Form.interface";
import { IErrosListObject } from "../../Data/interfaces/IValidation";
import { AuthContextType } from "../../Data/types/Auth";
import Loading from "../../Layout/Loading";
import { getSelectList, getTenantFormObject } from "../../Services/FormService";
import DialogActionButtons from "../Global/DialogActionButtons";
import Date from "../Global/FormComponents/Date";
import Input from "../Global/FormComponents/Input";
import Select from "../Global/FormComponents/Select";
import UpdateDocument from "./UpdateDocument";

interface EditTenantFormProps {
  tenant: Tenant;
  onCancel: () => void;
}
export default function EditTenantForm({
  tenant,
  onCancel,
}: EditTenantFormProps) {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const editTenantRefs: Ref<any> = useRef(
    tenantsFormLabels.map(() => createRef()),
  );
  const [document, setDocument] = useState<File | null>(null);
  const [editLoading, setEditLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    const { getSubmitFormValues } = await import("../../Services/Global");
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      tenantsFormLabels,
      editTenantRefs,
    );
    if (isFormPropper) {
      setEditLoading(true);
      setErrorList({});
      const values = formValues as { [key: string]: string };
      const tenantData: ITenantCreateForm = getTenantFormObject(values);
      const TenantApiService = (await import("../../Services/Api/TenantApi"))
        .default;
      TenantApiService.updateTenant(
        {
          _id: tenant._id,
          ...tenantData,
          apartment: tenant.apartment,
          agreement: tenant.agreement,
          currentAgreement: tenant.currentAgreement,
          owner: authState.mobile,
        } as Tenant,
        document,
      ).then(() => {
        setEditLoading(false);
        setLoading(true);
      });
    } else {
      setErrorList(errorList as IErrosListObject);
    }
  };

  const language = authState.language ?? "he";

  if (editLoading) {
    return <Loading text={"עורך פרטי דייר..."} />;
  }

  return (
    <>
      <Grid container style={{ height: "450px" }} spacing={3}>
        <Grid item sm={4}>
          <UpdateDocument
            document={tenant.currentAgreement}
            newDocument={document}
            changeDocument={(newDoc: File | null) => {
              setDocument(newDoc);
            }}
          />
        </Grid>
        <Grid item sm={8} className="rtl">
          <Grid container spacing={2}>
            {tenantsFormLabels.map((item, index) => (
              <Grid
                item
                sm={item.gridSize}
                key={item.en_label}
                className="mt-2"
              >
                {item.type.fieldType === "date" ? (
                  <Date
                    label={item[`${language}_label`]}
                    value={tenant[item.key]}
                    ref={editTenantRefs.current[index]}
                    errorComment={errorList[item.key]}
                  />
                ) : item.type.fieldType === "select" ? (
                  <Select
                    label={item[`${language}_label`]}
                    value={tenant[item.key]}
                    error={errorList[item.key]}
                    disabled={false}
                    list={getSelectList(item)}
                    ref={editTenantRefs.current[index]}
                  />
                ) : (
                  <Input
                    label={item[`${language}_label`]}
                    disabled={false}
                    value={tenant[item.key]}
                    required={true}
                    textType={"text"}
                    error={errorList[item.key]}
                    ref={editTenantRefs.current[index]}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div className="rtl">
        <DialogActionButtons onSubmit={onSubmit} onCancel={onCancel} />
      </div>
    </>
  );
}
