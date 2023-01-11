import { useState } from "react";
import CreateApartmentForm from "../Components/Create/CreateApartment/CreateApartment";
import TenantOptions from "../Components/Create/CreateTenant/ChooseTenantOptions";
import "../Layout/CSS/Create.css";
import "../Layout/CSS/Form.css";
import Loading from "../Layout/Loading";

export default function Create() {
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
