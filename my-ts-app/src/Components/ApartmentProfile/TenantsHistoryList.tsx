import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Tenant } from "../../Data/builders/Tenant";

// const arr = [1, 2, 3];
interface TenantsHistoryListProps {
  tenants: Tenant[];
}
export default function TenantsHistoryList({
  tenants,
}: TenantsHistoryListProps) {
  if (!(tenants && tenants.length > 0)) {
    return null;
  }
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }} className="mt-2">
      {tenants.splice(0, 3).map((tenant, index) => (
        <Fragment key={`history-tenants-${index}`}>
          <ListItem alignItems="flex-start" sx={{ textAlign: "start" }}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/staticImages/famale.png" />
            </ListItemAvatar>
            <ListItemText
              primary={tenant.fullName}
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    תאריכים
                    {tenant.startDate.toDateString()}-
                    {tenant.endDate.toDateString()}
                  </Typography>
                  <br />
                  ראה עוד...
                </Fragment>
              }
            />
          </ListItem>
          {tenant !== tenants[index] && (
            <Divider variant="inset" component="li" />
          )}
        </Fragment>
      ))}
    </List>
  );
}
