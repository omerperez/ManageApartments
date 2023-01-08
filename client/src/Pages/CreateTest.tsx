import { useState } from "react";
import CreateApartmentForm from "../Components/CreateApartment/CreateApartment";
import TenantOptions from "../Components/CreateTenant/ChooseTenantOptions";
import "../Layout/CSS/Create.css";
import Loading from "../Layout/Loading";

export default function CreateTest() {
  const [loading, setLoading] = useState<boolean>(false);
  const [apartmentId, setApartmentId] = useState<string>("");

  if (loading) {
    return <Loading text="...אנא המתן" />;
  }

  return (
    <div className="create-form-layout">
      {apartmentId ? (
        <TenantOptions apartmentId={apartmentId} />
      ) : (
        <CreateApartmentForm
          setApartmentId={setApartmentId}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
