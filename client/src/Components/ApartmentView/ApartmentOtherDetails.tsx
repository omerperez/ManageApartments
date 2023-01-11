import { Grid } from "@mui/material";
import { useState } from "react";
import { othersDetailsFields } from "../../Assets/Profile";
import { Apartment } from "../../Data/builders/Apartment";
import SideDetailsMenu from "./SideDetailsMenu";

type ApartmentOtherDetailsProps = {
  apartment: Apartment;
};
export default function ApartmentOtherDetails({
  apartment,
}: ApartmentOtherDetailsProps) {
  const [activeButton, setActiveButton] = useState<number>(0);

  const changeActiveButton = (index: number) => {
    setActiveButton(index);
  };

  const OTHER_DETAILS_COMMENT = "תיאור נוסף";
  return (
    <>
      <Grid item sm={9}>
        <Grid container spacing={0}>
          {othersDetailsFields.map((field, index) => (
            <Grid item sm={4} key={`moreDetailPropItem-${index}`}>
              <div className="apartment-details-others-label">
                {field.he_label}
              </div>
              <b className="apartment-details-others-value">
                {apartment[field.key]}
              </b>
            </Grid>
          ))}
          <Grid item sm={4}>
            <b className="apartment-details-others-value">
              {OTHER_DETAILS_COMMENT}
            </b>
          </Grid>
          <Grid item sm={8} className="apartment-details-others-label mt-2">
            <span>{apartment.comments}</span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={3} display="flex" justifyContent={"center"}>
        <SideDetailsMenu
          activeButton={activeButton}
          changeActiveButton={changeActiveButton}
        />
      </Grid>
    </>
  );
}
