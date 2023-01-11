import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { famaleImage, maleImage } from "../../../../Assets/StaticImages";
import { ITenant } from "../../../../Data/interfaces/ITenant";
import MainTenantCard from "../MainTenantCard";

interface TenantHistoryContentProps {
  tenants: ITenant[];
}
export default function TenantHistoryContent({
  tenants,
}: TenantHistoryContentProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(tenants.length - 1);

  return (
    <Grid container spacing={4} style={{ direction: "rtl" }}>
      <Grid item sm={4}>
        <List component="nav" aria-label="history-dialog">
          {tenants.map((tenant, index) => (
            <ListItemButton
              key={`tenant-list-item-${index + tenant.id}`}
              selected={currentIndex === index}
              onClick={() => {
                setCurrentIndex(index);
              }}
            >
              <ListItemIcon>
                <img
                  src={tenant.gender === "נקבה" ? famaleImage : maleImage}
                  width={40}
                  alt="profile-pic"
                  className="profile-img"
                />
              </ListItemIcon>
              <ListItemText
                primary={`${tenant.firstName} ${tenant.lastName}`}
              />
            </ListItemButton>
          ))}
        </List>
      </Grid>
      <Grid item sm={4}>
        <MainTenantCard tenant={tenants[currentIndex]} />
      </Grid>
      <Grid item sm={4}>
        <h5>חוזה אחרון</h5>
        <iframe
          src={tenants[currentIndex].currentAgreement}
          title={`tenant-agreement`}
          width={"100%"}
          height={380}
          className="user-image"
        />
      </Grid>
    </Grid>
  );
}
