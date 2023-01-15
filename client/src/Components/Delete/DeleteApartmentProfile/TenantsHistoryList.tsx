import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { famaleImage, maleImage } from "../../../Assets/StaticImages";
import { ITenant } from "../../../Data/interfaces/ITenant";

interface TenantsHistoryListProps {
  tenants: ITenant[];
}
export default function TenantsHistoryList({
  tenants,
}: TenantsHistoryListProps) {
  return (
    <List className="tenant-history">
      {tenants.map((tenant, index) => (
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
                  <div>ראה עוד...</div>
                </Fragment>
              }
            />
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
}
