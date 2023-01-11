import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { famaleImage, maleImage } from "../../../../Assets/StaticImages";
import { ITenant } from "../../../../Data/interfaces/ITenant";

interface TenantsHistoryListProps {
  tenants: ITenant[];
}
export default function HistoryList({ tenants }: TenantsHistoryListProps) {
  if (tenants.length < 0) {
    return null;
  }
  const SEE_MORE_BUTTON_TEXT = "ראה עוד...";
  return (
    <List className="tenant-history">
      {tenants.map((tenant, index) => (
        <Fragment key={`history-tenants-${tenant.id + index}`}>
          <ListItem alignItems="flex-start" className="text-start">
            <ListItemAvatar>
              <Avatar
                alt="Tenant History List"
                src={tenant.gender === "נקבה" ? famaleImage : maleImage}
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
                  <div>{SEE_MORE_BUTTON_TEXT}</div>
                </Fragment>
              }
            />
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
}
