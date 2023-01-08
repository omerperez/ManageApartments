import { Groups, PersonAdd, PersonOff } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useState } from "react";
import { defaultTenant, defaultTenant2 } from "../../Assets/StaticData";
import { ITenant } from "../../Data/interfaces/ITenant";
import ThemeStyleRTL from "../../Layout/ThemeStyleRTL";
import ChangeTenantButton from "../Edit/EditApartment/ChangeTenantButton";
import TenantsList from "../Edit/EditApartment/TenantsList";
import CreateTenantForm from "./Form";

interface ChooseTenantOptionsProps {
  apartmentId: string;
}
export default function ChooseTenantOptions({
  apartmentId,
}: ChooseTenantOptionsProps) {
  const [tenantsList, setTenantList] = useState<ITenant[]>([]);
  const [tenant, setTenant] = useState<ITenant | null>(null);
  const [option, setOption] = useState<number>(-1);

  const chooseTenantFromList = () => {
    //fetch - get all tenant that free -> prop: apartmentId
    setTenantList([
      defaultTenant,
      defaultTenant2,
      defaultTenant,
      defaultTenant2,
      defaultTenant,
    ]);
  };

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
