import { Groups, PersonAdd, PersonOff } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useState } from "react";
import { Tenant } from "../../Data/interfaces/entities/Tenant.entity";
import "../../Layout/CSS/EditTenant.css";
import Loading from "../../Layout/Loading";
import CreateTenant from "../Create/CreateTenant/CreateTenant";
import ChangeTenantButton from "../Delete/Edit/EditApartment/ChangeTenantButton";
import ChangeTenantFromList from "./ChangeTenantFromList";
import EditTenantForm from "./EditTenantForm";
import RemoveTenant from "./RemoveTenant";

interface EditTenantMenuProps {
  tenant?: Tenant;
  currentOption: number;
  changeOption: (option: number) => void;
}

export default function EditTenantMenu({
  tenant,
  currentOption,
  changeOption,
}: EditTenantMenuProps) {
  const [newTenant, setNewTenant] = useState<string>(tenant?._id ?? "");
  const [document, setDocument] = useState<File | null>(null);

  // Constans
  const REMOVE_TENANT = "הסר דייר";
  const CHOOSE_TENANT_FROM_LIST = "בחר דייר מתוך רשימה";
  const CREATE_NEW_TENANT = "צור דייר חדש";
  const EDIT_TENANT = "עריכת פרטי דייר";

  const optionsBtns = [
    {
      color: "red",
      icon: <PersonOff />,
      text: REMOVE_TENANT,
    },
    {
      color: "blue",
      icon: <Groups />,
      text: CHOOSE_TENANT_FROM_LIST,
    },
    {
      color: "green",
      icon: <PersonAdd />,
      text: CREATE_NEW_TENANT,
    },
    {
      color: "blue",
      icon: <Groups />,
      text: EDIT_TENANT,
    },
  ];

  if (!tenant) {
    return <Loading />;
  }

  const onCancel = () => {
    changeOption(-1);
  };

  const options = [
    <RemoveTenant tenant={tenant} onCancel={onCancel} />,
    <ChangeTenantFromList
      tenantId={newTenant}
      changeTenant={(id: string) => setNewTenant(id)}
      newDocument={document}
      changeDocument={(doc: File | null) => setDocument(doc)}
      onCancel={onCancel}
    />,
    <CreateTenant apartmentId={tenant.apartment} onCancel={onCancel} />,
    <EditTenantForm tenant={tenant} onCancel={onCancel} />,
  ];

  if (currentOption === -1) {
    return (
      <Grid container spacing={3}>
        {optionsBtns.map((button, index) => (
          <Grid item sm={3} key={`options-menu-${index}`}>
            <ChangeTenantButton
              color={button.color}
              onClick={() => changeOption(index)}
              icon={button.icon}
              text={button.text}
              disabled={tenant ? false : true}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return options[currentOption];
}
