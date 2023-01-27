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

const RENT = "תפוסה";
const FREE = "פנויה";
export default function ApartmentCard({
  apartment,
  language,
}: ApartmentCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (apartment === null) return null;

  const backgroundCard = {
    backgroundImage: `url(${apartment.images[apartment.mainImageIndex]})`,
  };

  return (
    <div className="relative">
      <div className="block">
        <ThemeStyleRTL>
          <Card sx={MuiCard} className="card-layout">
            <div style={backgroundCard} className="card-bg-img">
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
              title={<h5>{apartment.name}</h5>}
              subheader={apartment.getFullAddress()}
            />
            <CardMenuActions apartmentId={apartment.id} />
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
        <div className="busy">{RENT}</div>
      ) : (
        <div className="available">{FREE}</div>
      )}
    </div>
  );
}
