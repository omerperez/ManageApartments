import { FindInPage, WhatsApp } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Grid,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { tenantContentCardProperties } from "../../Assets/Profile";
import { maleImage } from "../../Assets/StaticImages";
import { ITenant } from "../../Data/interfaces/ITenant";
import ThemeStyleRTL from "../../Layout/ThemeStyleRTL";

type TenantsCardProps = {
  currentTenant: ITenant;
  language: string;
  isEditDialog?: boolean;
  children?: JSX.Element;
  sx?: SxProps<Theme>;
};

export default function TenantsCard({
  currentTenant,
  language,
  isEditDialog,
  children,
  sx,
}: TenantsCardProps) {
  if (!currentTenant) return null;

  const getContentValue = (key: string) => {
    if (key === "fullName") {
      return `${currentTenant.firstName} ${currentTenant.lastName}`;
    }
    if (key === "Occupancy Period") {
      return `${currentTenant.startDate} - ${currentTenant.endDate}`;
    }
    return currentTenant[key as keyof ITenant];
  };

  return (
    <Card
      sx={sx ?? { maxWidth: 400 }}
      className={
        isEditDialog
          ? "tenant-card-border relative h-100"
          : "tenant-card-border relative"
      }
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
        <span>{getContentValue("fullName")}</span>
      </Typography>
      <CardContent>
        <Grid container className="tenant-details">
          {tenantContentCardProperties.map((item, key) => (
            <Grid
              item
              sm={item.gridSize}
              className="mt-2"
              key={`td-lbls-${key}`}
            >
              {item[`${language}_label`]}
              <br />
              <span className="tenant-values">{getContentValue(item.key)}</span>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      {!isEditDialog && (
        <ThemeStyleRTL>
          <Grid container className="mt-2">
            <Grid item sm={6}>
              <Button
                fullWidth
                endIcon={<WhatsApp className="tenant-card-btn-icon" />}
                className="whatsapp-btn tenant-card-btn"
              >
                {language === "en" ? "WhatsApp" : "וואטסאפ"}
              </Button>
            </Grid>

            <Grid item sm={6} className="m-auto">
              <Button
                fullWidth
                className="docs-btn tenant-card-btn"
                endIcon={<FindInPage className="tenant-card-btn-icon" />}
              >
                {language === "en" ? "Agreement" : "צפה בחוזה"}
              </Button>
            </Grid>
          </Grid>
        </ThemeStyleRTL>
      )}
    </Card>
  );
}
