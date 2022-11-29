import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { defaultApartment, emptyApartment } from "../Assets/StaticData";
import ApartmentPart from "../Components/CreateApartment/ApartmentPart";
import { PrivateContext } from "../Contexts/Private";
import { Apartment } from "../Data/builders/Apartment";
import "../Layout/CSS/EditApartment.css";
import Loading from "../Layout/Loading";

export default function EditApartment() {
  const [searchParams] = useSearchParams();
  const [editApartment, setEditApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { privateDispatch } = useContext(PrivateContext);
  const navigate = useNavigate();

  useMemo(() => {
    const fetchData = async () => {
      const data = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
      );
      console.log(data);
      if (searchParams) {
        const apartmentId = searchParams.get("apartmentId");
        setEditApartment(defaultApartment);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchParams]);

  const handleCancelChanges = () => {
    privateDispatch({ type: "setApartment", apartment: emptyApartment });
    return navigate("/");
  };

  if (loading || !editApartment) {
    return <Loading />;
  }
  return (
    <div className="edit-layout">
      <div className="edit-title">עריכת דירה</div>
      <div className="edit-apartment">
        <ApartmentPart editApartment={editApartment} />
        <div className="mt-4 text-end">
          <Button
            variant="contained"
            className="edit-cancel-btn"
            onClick={handleCancelChanges}
          >
            בטל שינויים
          </Button>
          <Button variant="contained" className="edit-save-btn">
            שמור שינויים
          </Button>
        </div>
      </div>
    </div>
  );
}
