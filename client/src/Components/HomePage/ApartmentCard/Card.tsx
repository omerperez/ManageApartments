import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Fragment } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Apartment } from "../../../Data/builders/Apartment";
import CardMenuActions from "./CardMenuActions";

type ApartmentCardProps = {
  apartment: Apartment;
  language: string;
};

// Constans
const RENT = "תפוסה";
const FREE = "פנויה";

export default function ApartmentCard({
  apartment,
  language,
}: ApartmentCardProps) {
  const navigate = useNavigate();
  const isSmallWidthScreen = useMediaQuery("(max-width:1750px)");

  const onClickApartmentView = () => {
    return navigate({
      pathname: "/apartment",
      search: createSearchParams({
        apartmentId: apartment.id,
      }).toString(),
    });
  };

  if (apartment === null) return null;

  return (
    <div className="apartment-card">
      <img
        onClick={onClickApartmentView}
        src={apartment.images[apartment.mainImageIndex]}
        alt="apartment-profile"
        className="card-bg-img"
      />
      <div className="apartment-card-body">
        <div className="apartment-card-title">{apartment.name}</div>
        <div className="apartment-card-subtitle">
          {apartment.getFullAddress()}
        </div>
        <Grid container spacing={1} className="apartment-card-details">
          {apartment.getContentProperties().map((prop, key) => (
            <Fragment key={`body-card-${key}`}>
              <Grid item xs={4} md={isSmallWidthScreen ? 4 : 2}>
                <b>{prop[`${language}_label`]}</b>
              </Grid>
              <Grid item xs={8} md={isSmallWidthScreen ? 8 : 4}>
                <span>{prop.value}</span>
              </Grid>
            </Fragment>
          ))}
        </Grid>
        <div style={{ marginTop: 16 }}>
          <CardMenuActions apartmentId={apartment.id} />
        </div>
      </div>
    </div>
  );
}
