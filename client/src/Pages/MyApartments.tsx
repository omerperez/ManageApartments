import { Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MY_APARTMENT } from "../Assets/IConstans";
import { defaultApartment } from "../Assets/StaticData";
import Card from "../Components/HomePage/ApartmentCard/Card";
import { AuthContext } from "../Contexts/AuthContext";
import { Apartment } from "../Data/builders/Apartment";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/MyApartment.css";

export default function MyApartments() {
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
    <div className={`my-apartment-${authState.language}`}>
      <div className="my-apartment-layout">
        <Grid container>
          <Grid item sm={6}>
            <h1>הדירות שלי</h1>
          </Grid>
          <Grid item sm={6} className="create-btn-position">
            <Button
              className="my-apartment-create-btn"
              onClick={() => navigate("/create-apartment")}
            >
              {MY_APARTMENT[authState.language.toUpperCase()].createBtn}
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} className="my-apartment-cards">
          {apartments.map((item, key) => (
            <Grid item xs={6} sm={3} key={`${item.name}-${key}`}>
              <Card apartment={item} language={authState.language} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
