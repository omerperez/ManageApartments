import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { TENANT_HISTORY } from "../../../../Assets/IConstans";
import { famaleImage, maleImage } from "../../../../Assets/StaticImages";
import { Tenant } from "../../../../Data/interfaces/entities/Tenant.entity";
import { useError403 } from "../../../../Services/Utils/useError403";
import TenantCard from "../TenantCard";

interface TenantHistoryContentProps {
  tenants: Tenant[];
}
export default function TenantHistoryContent({
  tenants,
}: TenantHistoryContentProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(tenants.length - 1);

  if (currentIndex < 0) return null;

  return (
    <Grid container spacing={4} className="rtl">
      <Grid item xs={12} sm={4}>
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
                  onError={useError403}
                  width={40}
                  alt="profile-pic"
                  className="profile-img"
                />
              </ListItemIcon>
              <ListItemText
                className="text-start"
                primary={`${tenant.firstName} ${tenant.lastName}`}
              />
            </ListItemButton>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TenantCard tenant={tenants[currentIndex]} hideActions={true} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <h5>{TENANT_HISTORY.LAST_AGREEMENT}</h5>
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
