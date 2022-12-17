import { useEffect, useState } from "react";
import { defaultApartment } from "../Assets/StaticData";
import "../Layout/CSS/EditApartment.css";
import Loading from "../Layout/Loading";

import EditApartmentForm from "../Components/Edit/EditApartment/EditApartment";
import { IApartment } from "../Data/interfaces/IApartment";

export default function EditApartment() {
  const [currentApartment, setCurrentApartment] = useState<IApartment | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = () => {
      setCurrentApartment(defaultApartment);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading || !currentApartment) {
    return <Loading />;
  }
  return (
    <div className="create-form-layout">
      <EditApartmentForm editApartment={currentApartment} />
    </div>
  );
}
