import { Groups, PersonAdd, PersonOff } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useState } from "react";
import { Tenant } from "../../../Data/interfaces/entities/Tenant.entity";
import ThemeStyleRTL from "../../../Layout/ThemeStyleRTL";
import ChangeTenantButton from "../../Delete/Edit/EditApartment/ChangeTenantButton";
import TenantsList from "../../Delete/Edit/EditApartment/TenantsList";
import CreateTenantForm from "./CreateTenant";

interface ChooseTenantOptionsProps {
  apartmentId: string;
}
export default function ChooseTenantOptions({
  apartmentId,
}: ChooseTenantOptionsProps) {
  const [tenantsList, setTenantList] = useState<Tenant[]>([]);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [option, setOption] = useState<number>(-1);

  const optionsBtns = [
    {
      color: "blue",
      icon: <Groups />,
      text: "בחר דייר מתוך רשימה",
    },
    {
      color: "green",
      icon: <PersonAdd />,
      text: "צור דייר חדש",
    },
    {
      color: "red",
      icon: <PersonOff />,
      text: "דירה ללא דייר",
    },
  ];

  const options = [
    <TenantsList
      isShowOnly={false}
      tenantsList={tenantsList}
      setEditTenant={setTenant}
    />,
    <CreateTenantForm apartmentId={apartmentId} />,
  ];

  if (option === -1) {
    return (
      <div className="edit-form">
        <div className="sub-page-title mb-3">{"הוספת דייר"}</div>
        <ThemeStyleRTL>
          <Grid container spacing={3}>
            {optionsBtns.map((button, index) => (
              <Grid item sm={4}>
                <ChangeTenantButton
                  color={button.color}
                  onClick={() => setOption(index)}
                  icon={button.icon}
                  text={button.text}
                  disabled={index === 0 && tenantsList.length === 0}
                />
              </Grid>
            ))}
          </Grid>
        </ThemeStyleRTL>
      </div>
    );
  }
  return options[option];
}
