import { Grid } from "@mui/material";
import { useState } from "react";
import { othersDetailsFields } from "../../Assets/Profile";
import { Apartment } from "../../Data/builders/Apartment";
import useMobieDesign from "../../Hooks/useMobile";
import SideDetailsMenu from "./SideDetailsMenu";

// Constans
const OTHER_DETAILS_COMMENT = "תיאור נוסף";

type ApartmentOtherDetailsProps = {
  apartment: Apartment;
};
export default function ApartmentOtherDetails({
  apartment,
}: ApartmentOtherDetailsProps) {
  const isMobileScreen = useMobieDesign();
  const [activeButton, setActiveButton] = useState<number>(0);

  const changeActiveButton = (index: number) => {
    setActiveButton(index);
  };

  const apartmentDetailsMenu = (
    <Grid item xs={12} sm={3} display="flex" justifyContent={"center"}>
      <SideDetailsMenu
        activeButton={activeButton}
        changeActiveButton={changeActiveButton}
      />
    </Grid>
  );

  return (
    <>
      {isMobileScreen && apartmentDetailsMenu}
      <Grid item xs={12} sm={9}>
        <Grid container spacing={0}>
          {othersDetailsFields.map((field, index) => (
            <Grid item xs={5.5} sm={4} key={`moreDetailPropItem-${index}`}>
              <div className="apartment-details-others-label">
                {field.he_label}
              </div>
              <b className="apartment-details-others-value">
                {apartment[field.key]}
              </b>
            </Grid>
          ))}
          <Grid item xs={12} sm={4}>
            <b className="apartment-details-others-value">
              {OTHER_DETAILS_COMMENT}
            </b>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            className="apartment-details-others-label mb-3"
          >
            <span>{apartment.comments}</span>
          </Grid>
        </Grid>
      </Grid>
      {!isMobileScreen && apartmentDetailsMenu}
    </>
  );
}
