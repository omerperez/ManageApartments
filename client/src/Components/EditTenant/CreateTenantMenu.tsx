import { Groups, PersonAdd } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useState } from "react";
import "../../Layout/CSS/EditTenant.css";
import CreateTenant from "../Create/CreateTenant/CreateTenant";
import ChangeTenantButton from "../Delete/Edit/EditApartment/ChangeTenantButton";
import ChangeTenantFromList from "./ChangeTenantFromList";

// Constans
const CHOOSE_TENANT_FROM_LIST = "בחר דייר מתוך רשימה";
const CREATE_NEW_TENANT = "צור דייר חדש";

interface CreateTenantMenuProps {
  apartmentId: string;
  currentOption: number;
  changeOption: (option: number) => void;
}

// Assets
const editOptionsButtons = [
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
];

export default function CreateTenantMenu({
  apartmentId,
  currentOption,
  changeOption,
}: CreateTenantMenuProps) {
  const [newTenant, setNewTenant] = useState<string>("");
  const [document, setDocument] = useState<File | null>(null);

  const onCancel = () => {
    changeOption(-1);
  };

  const options = [
    <ChangeTenantFromList
      tenantId={newTenant}
      changeTenant={(id: string) => setNewTenant(id)}
      newDocument={document}
      changeDocument={(doc: File | null) => setDocument(doc)}
      onCancel={onCancel}
    />,
    <CreateTenant apartmentId={apartmentId} onCancel={onCancel} />,
  ];

  if (currentOption === -1) {
    return (
      <Grid container spacing={3}>
        {editOptionsButtons.map((button, index) => (
          <Grid item sm={6} key={`options-menu-${index}`}>
            <ChangeTenantButton
              color={button.color}
              onClick={() => changeOption(index)}
              icon={button.icon}
              text={button.text}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return options[currentOption];
}
