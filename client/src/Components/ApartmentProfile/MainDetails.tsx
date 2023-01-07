import { Grid } from "@mui/material";
import { useState } from "react";
import { Apartment } from "../../Data/builders/Apartment";
import MoreDetails from "./MoreDetails";

type Detailsrops = {
  apartment: Apartment;
  language: string;
};

export default function Details({ apartment, language }: Detailsrops) {
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleChangeActiveSection = (index: number) => {
    setActiveSection(index);
  };

  if (!apartment) {
    return null;
  }

  return (
    <Grid container spacing={1} className="main-details">
      <Grid item xs={9.5}>
        <b>{`${apartment.street} ${apartment.number}, `}</b>
        <b className="city-text">{apartment.city}</b>
        <br />
        <span className="floor-text">
          {language === "en"
            ? `Floor ${apartment.floor}`
            : `קומה ${apartment.floor}`}
        </span>
      </Grid>
      <Grid item xs={2.5} className="price-text">
        {`${apartment.price} ש״ח`}
      </Grid>
      <MoreDetails
        language={language}
        apartment={apartment}
        activeSection={activeSection}
        changeSection={handleChangeActiveSection}
      />
    </Grid>
  );
}
