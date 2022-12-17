import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageLabels } from "../Assets/Apartments";
import { defaultApartment } from "../Assets/StaticData";
import Card from "../Components/HomePage/ApartmentCard/Card";
import GlobalButton from "../Components/Global/GlobalButton";
import { AuthContext } from "../Contexts/AuthContext";
import { Apartment } from "../Data/builders/Apartment";
import "../Layout/CSS/Profile.css";
import { AuthContextType } from "../Data/types/Auth";

export default function Apartments() {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setApartments([
      defaultApartment,
      defaultApartment,
      defaultApartment,
      defaultApartment,
    ]);
  }, [authState.id]);

  return (
    <div className={`home-layout-${authState.language}`}>
      <div className="d-flex justify-content-start">
        <GlobalButton
          classStyle={"whatsapp-btn"}
          text={pageLabels[authState.language].createBtn}
          fullWidth={false}
          icon={null}
          onClick={() => navigate("/create-apartment")}
        />
      </div>
      <Grid
        container
        spacing={2}
        className="d-flex justify-content-center mt-2"
      >
        {apartments.map((item, key) => (
          <Grid item xs={6} sm={3} key={`${item.name}-${key}`}>
            <Card apartment={item} language={authState.language} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}