import { Divider, Grid, IconButton } from "@mui/material";
import { apartmentMenuItems, detailsLabels } from "../../Assets/Profile";
import { Apartment } from "../../Data/builders/Apartment";

type Detailsrops = {
  apartment: Apartment;
  activeSection: number;
  changeSection: (index: number) => void;
  language: string;
};
export default function MoreDetails({
  apartment,
  activeSection,
  changeSection,
  language,
}: Detailsrops) {
  return (
    <>
      <Grid item xs={9.5} className="mt-2">
        <Divider className="divider-details" />
        <Grid container className="profile-labels mt-0" spacing={1.5}>
          {detailsLabels.map((prop, index) => (
            <Grid item sm={4} key={`moreDetailPropItem-${index}`}>
              <span>{prop[`${language}_label`]}</span>
              <br />
              <b className="area-values">{prop.value}</b>
            </Grid>
          ))}
          <Grid item sm={4}>
            <b className="area-values">
              {language === "en" ? "More Details" : "תיאור נוסף"}
            </b>
          </Grid>
          <Grid item sm={7}>
            <span>{apartment.comments}</span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1.1} className="text-center m-auto mt-2 ">
        <div className="mt-more-details mt-1 apartment-btns-group">
          {apartmentMenuItems.map((menuItem, index) => (
            <IconButton
              className={`apartment-btn-${
                activeSection === index ? "" : "non-"
              }active mt-2`}
              key={`menu-item-btn${index}`}
              onClick={() => changeSection(index)}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              {menuItem.icon}
            </IconButton>
          ))}
        </div>
      </Grid>
    </>
  );
}
