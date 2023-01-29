import { Groups, PersonAdd, PersonOff } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useState } from "react";
import ThemeStyleRTL from "../../../Layout/ThemeStyleRTL";
import ChangeTenantButton from "../../Delete/Edit/EditApartment/ChangeTenantButton";
import TenantsList from "../../Delete/Edit/EditApartment/TenantsList";
import CreateTenantForm from "./CreateTenant";

// Constans
const ADD_TENANT = "הוספת דייר";

interface ChooseTenantOptionsProps {
  apartmentId: string;
}
export default function ChooseTenantOptions({
  apartmentId,
}: ChooseTenantOptionsProps) {
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
    <TenantsList isShowOnly={false} tenantsList={[]} />,
    <CreateTenantForm apartmentId={apartmentId} />,
  ];

  if (option === -1) {
    return (
      <div className="edit-form">
        <div className="sub-page-title mb-3">{ADD_TENANT}</div>
        <ThemeStyleRTL>
          <Grid container spacing={3}>
            {optionsBtns.map((button, index) => (
              <Grid item xs={12} sm={4}>
                <ChangeTenantButton
                  color={button.color}
                  onClick={() => setOption(index)}
                  icon={button.icon}
                  text={button.text}
                  disabled={index === 0 && [].length === 0}
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
