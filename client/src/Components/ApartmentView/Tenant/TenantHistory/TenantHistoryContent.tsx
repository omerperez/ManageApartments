import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { famaleImage, maleImage } from "../../../../Assets/StaticImages";
import { Tenant } from "../../../../Data/interfaces/entities/Tenant.entity";
import TenantCard from "../TenantCard";

interface TenantHistoryContentProps {
  tenants: Tenant[];
}
export default function TenantHistoryContent({
  tenants,
}: TenantHistoryContentProps) {
  // Constans
  const AGREEMENT_TITLE = "חוזה אחרון";
  const [currentIndex, setCurrentIndex] = useState<number>(tenants.length - 1);

  if (currentIndex < 0) {
    return null;
  }

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
                  src={+tenant.gender === 2 ? famaleImage : maleImage}
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
        <TenantCard tenant={tenants[currentIndex]} hideActions={true} />
      </Grid>
      <Grid item sm={4}>
        <h5>{AGREEMENT_TITLE}</h5>
        <iframe
          src={tenants[currentIndex].currentAgreement}
          title={`tenant-agreement`}
          width={"100%"}
          loading="lazy"
          height={380}
          className="user-image"
        />
      </Grid>
    </Grid>
  );
}
