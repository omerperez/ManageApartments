import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { famaleImage, maleImage } from "../../../../Assets/StaticImages";
import { Tenant } from "../../../../Data/interfaces/entities/Tenant.entity";

interface TenantsHistoryListProps {
  tenants: Tenant[];
}
export default function HistoryList({ tenants }: TenantsHistoryListProps) {
  const [lastTenants, setLastTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    const tempTenants = tenants;
    const tenantsLength = tenants.length;
    if (tenantsLength > 3) {
      setLastTenants(tempTenants.slice(tenantsLength - 3));
    } else {
      setLastTenants(tempTenants);
    }
  }, [tenants]);

  if (lastTenants.length === 0) {
    return null;
  }

  return (
    <List className="tenant-history">
      {lastTenants.map((tenant, index) => (
        <Fragment key={`history-tenants-${tenant.id + index}`}>
          <ListItem alignItems="flex-start" className="text-start">
            <ListItemAvatar>
              <Avatar
                alt="Tenant History List"
                src={+tenant.gender === 2 ? famaleImage : maleImage}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${tenant.firstName} ${tenant.lastName}`}
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`תאריכים: ${tenant.startDate} - ${tenant.endDate}`}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
}
