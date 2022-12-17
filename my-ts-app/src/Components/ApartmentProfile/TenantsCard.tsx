import { FindInPage, WhatsApp } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { maleImage } from "../../Assets/StaticImages";
import { Tenant } from "../../Data/builders/Tenant";

type TenantsCardProps = {
  currentTenant: Tenant;
  language: string;
  isEditDialog?: boolean;
  children?: JSX.Element;
};

export default function TenantsCard({
  currentTenant,
  language,
  isEditDialog,
  children,
}: TenantsCardProps) {
  if (!currentTenant) return null;

  return (
    <Card
      className={
        isEditDialog
          ? "tenant-card-border relative h-100"
          : "tenant-card-border relative"
      }
      style={{ maxWidth: 400 }}
    >
      {children}
      <div className={isEditDialog ? "text-center mt-3" : "text-center"}>
        <img
          src={maleImage}
          width={100}
          alt="profile-pic"
          className="profile-img"
        />
      </div>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        className="tenant-name"
      >
        <span>{currentTenant.fullName}</span>
      </Typography>
      <CardContent>
        <Grid container className="tenant-details">
          {currentTenant.getContentProperties().map((item, key) => (
            <Grid
              item
              sm={item.gridSize}
              className="mt-2"
              key={`td-lbls-${key}`}
            >
              {item[`${language}_label`]}
              <br />
              <span className="tenant-values">{item.value.toString()}</span>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      {!isEditDialog && (
        <Grid container spacing={1} className={"btns-tenant-card"}>
          <Grid item sm={6} className="m-auto ">
            <Button
              size="large"
              variant="outlined"
              fullWidth
              className="whatsapp-btn"
            >
              <Grid container>
                <Grid item sm={2} className="d-center">
                  <WhatsApp />
                </Grid>
                <Grid item sm={10}>
                  {language === "en" ? "Send WhatsApp" : "שלח וואטסאפ"}
                </Grid>
              </Grid>
            </Button>
          </Grid>

          <Grid item sm={6} className="m-auto">
            <Button
              size="large"
              variant="outlined"
              fullWidth
              className="docs-btn"
            >
              <Grid container>
                <Grid item sm={2} className="d-center">
                  <FindInPage />
                </Grid>
                <Grid item sm={10}>
                  {language === "en" ? "See Agreement" : "ראה/י חוזה"}
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      )}
    </Card>
  );
}
