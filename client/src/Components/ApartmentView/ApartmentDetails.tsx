import { Divider, Grid } from "@mui/material";
import { Apartment } from "../../Data/builders/Apartment";
import ApartmentOtherDetails from "./ApartmentOtherDetails";

interface ApartmentDetailsProps {
  apartment: Apartment;
}
export default function ApartmentDetails({ apartment }: ApartmentDetailsProps) {
  const address = `${apartment.street} ${apartment.number}, ${apartment.city}`;
  const floor = `קומה ${apartment.floor}`;
  const price = `${apartment.price} ש״ח`;
  return (
    <Grid container spacing={1} className="mt-2">
      <Grid item sm={9}>
        <div className="apartment-details-address">{address}</div>
        <div className="apartment-details-floor">{floor}</div>
        <Divider className="apartment-details-divider mt-2" />
      </Grid>
      <Grid item sm={3} className="apartment-details-price">
        {price}
      </Grid>
      <ApartmentOtherDetails apartment={apartment} />
    </Grid>
  );
}
