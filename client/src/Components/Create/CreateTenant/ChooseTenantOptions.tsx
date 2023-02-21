import { Groups, PersonAdd, PersonOff } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  const handleClick = (index: number) => {
    setOption(index);
    if (index === 2) {
      navigate(`/apartment?apartmentId=${apartmentId}`);
    }
  };
  if (option === -1) {
    return (
      <div className="choose-tenant-option-container">
        <div className="add-tenant-title-dialog">{ADD_TENANT}</div>
        <Grid container className="choose-tenant-option-btns">
          {optionsBtns.map((button, index) => (
            <Grid item xs={12} sm={4} key={button.text}>
              <div className="tenant-options-dialog-container">
                <ChangeTenantButton
                  color={button.color}
                  onClick={() => handleClick(index)}
                  icon={button.icon}
                  text={button.text}
                  disabled={index === 0 && [].length === 0}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  return options[option];
}
