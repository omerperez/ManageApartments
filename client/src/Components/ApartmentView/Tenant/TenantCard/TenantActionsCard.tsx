import { FindInPage, WhatsApp } from "@mui/icons-material";
import { Grid } from "@mui/material";
import ButtonIcon from "../../../Global/ButtonIcon";

export default function TenantActionsCard() {
  return (
    <Grid container>
      <Grid item sm={6}>
        <ButtonIcon
          text={"וואטסאפ"}
          icon={<WhatsApp className="tenant-card-btn-icon" />}
          className="whatsapp-btn tenant-card-btn"
        />
      </Grid>
      <Grid item sm={6}>
        <ButtonIcon
          text={"צפה בחוזה"}
          icon={<FindInPage className="tenant-card-btn-icon" />}
          className="docs-btn tenant-card-btn"
        />
      </Grid>
    </Grid>
  );
}
