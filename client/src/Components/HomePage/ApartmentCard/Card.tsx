import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { MY_APARTMENT } from "../../../Assets/IConstans";
import { Apartment } from "../../../Data/builders/Apartment";
import { MuiCard } from "../../../Layout/Mui/Home";
import ThemeStyleRTL from "../../../Layout/ThemeStyleRTL";
import CardMenuActions from "./CardMenuActions";

type ApartmentCardProps = {
  apartment: Apartment;
  language: string;
};

export default function ApartmentCard({
  apartment,
  language,
}: ApartmentCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (apartment === null) return null;

  return (
    <div className="relative">
      <div className="block">
        <ThemeStyleRTL>
          <Card sx={MuiCard} className="card-layout">
            <div
              style={{
                backgroundImage: `url(${
                  apartment.images[apartment.mainImageIndex]
                })`,
              }}
              className="card-bg-img"
            >
              <div className="d-end">
                <Button
                  size="large"
                  variant="outlined"
                  className="show-more-btn"
                  onClick={handleExpandClick}
                >
                  {MY_APARTMENT[language.toUpperCase()].viewMore}
                </Button>
              </div>
            </div>
            <CardHeader
              title={`${apartment.name}`}
              subheader={apartment.address.getFullAddress()}
            />
            <CardMenuActions apartmentId={apartment.id.toString()} />
            <Collapse in={expanded} timeout="auto">
              <CardContent>
                <Grid container spacing={1} className="card-design">
                  {apartment.getContentProperties().map((prop, key) => (
                    <Fragment key={`body-card-${key}`}>
                      <Grid item xs={5.5}>
                        <Typography>{prop[`${language}_label`]}</Typography>
                      </Grid>
                      <Grid item xs={6.5}>
                        <Typography variant="body2">{prop.value}</Typography>
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
        </ThemeStyleRTL>
      </div>
      {apartment.isRent() ? (
        <div className="busy">תפוסה</div>
      ) : (
        <div className="available">פנויה</div>
      )}
    </div>
  );
}
