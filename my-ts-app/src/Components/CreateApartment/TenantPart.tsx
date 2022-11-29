import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  citySelectOptions,
  fieldType,
  tenantsFormLabels,
} from "../../Assets/Create";
import Input from "../../Components/Global/FormComponents/Input";
import Select from "../../Components/Global/FormComponents/Select";
import { AuthContext } from "../../Contexts/AuthContext";
import { PrivateContext } from "../../Contexts/Private";
import { ITenant } from "../../Data/interfaces/ITenant";
import useForm from "../../Hooks/useForm";

interface TenantPartProps {
  editTenant?: ITenant | null;
}
export default function TenantPart({ editTenant }: TenantPartProps) {
  const [tenantValues, onChange, onSelectChange] = useForm();
  const { state } = useContext(AuthContext);
  const { privateState, privateDispatch } = useContext(PrivateContext);

  useEffect(() => {
    let details = editTenant ?? privateState.tenant;
    if (tenantValues) {
      Object.keys(tenantValues).map((key) => {
        return (details = {
          ...details,
          [key]: tenantValues[key],
        });
      });
      privateDispatch({ type: "setTenant", tenant: details });
    }
  }, [tenantValues]);

  const showCorrectFieldType = (item: fieldType) => {
    if (item.type === "select") {
      return (
        <Select
          list={citySelectOptions}
          value={tenantValues[item.name] ?? privateState.tenant[item.name]}
          label={item[`${state.language}_label`]}
          cancelLabel={false}
          name={item.name}
          onChange={onSelectChange}
        />
      );
    }

    return (
      <Input
        cancelLabel={false}
        label={item[`${state.language}_label`]}
        name={item.name}
        value={tenantValues[item.name] ?? privateState.tenant[item.name]}
        onChange={onChange}
        required={true}
        className="bg-white"
        type={item.type}
      />
    );
  };
  return (
    <div>
      <div className="mt-4 mb-3">
        <h3>פרטי הדייר</h3>
      </div>
      <Grid container spacing={2}>
        {tenantsFormLabels.map((item) => (
          <Grid item sm={item.gridSize} className="mb-2" key={item.en_label}>
            {showCorrectFieldType(item)}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
