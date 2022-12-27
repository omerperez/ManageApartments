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
import { ITenant } from "../../Data/interfaces/ITenant";

interface TenantsHistoryListProps {
  tenants: ITenant[];
}

export default function TenantsHistoryList({
  tenants,
}: TenantsHistoryListProps) {
  if (tenants.length < 0) {
    return null;
  }

  const sliceIndex = tenants.length > 4 ? 3 : tenants.length - 1;
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }} className="mt-2">
      {tenants.splice(0, sliceIndex).map((tenant, index) => (
        <Fragment key={`history-tenants-${tenant.id + index}`}>
          <ListItem alignItems="flex-start" sx={{ textAlign: "start" }}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/staticImages/famale.png" />
            </ListItemAvatar>
            <ListItemText
              primary={`${tenant.firstName} ${tenant.lastName}`}
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    תאריכים
                    {tenant.startDate}-{tenant.endDate}
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
