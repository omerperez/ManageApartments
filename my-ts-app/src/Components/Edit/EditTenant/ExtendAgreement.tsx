import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { Ref, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Tenant } from "../../../Data/builders/Tenant";
import { ITenant } from "../../../Data/interfaces/ITenant";
import { convertDateFormatToDayJS } from "../../../Features/Format";
import TenantsCard from "../../ApartmentProfile/TenantsCard";
import Date from "../../Global/FormComponents/Date";

interface ExtendAgreementProps {
  tenant: ITenant;
  language: string;
}

export default function ExtendAgreement({
  tenant,
  language,
}: ExtendAgreementProps) {
  const [error, setError] = useState("");
  const finishDateRef: Ref<any> = useRef();

  const handleSubmit = () => {
    const value = finishDateRef.current.value;
    if (value) {
      const dateValue = convertDateFormatToDayJS(value);
      if (dayjs().isAfter(dateValue)) {
        setError("");
        return;
      }
    }
    setError("ערך לא חוקי");
    return;
  };

  return (
    <div>
      <div className="sub-page-title mb-5">{"הארכת חוזה"}</div>
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <TenantsCard
            currentTenant={tenant as Tenant}
            language={language}
            isEditDialog={true}
          />
        </Grid>
        <Grid item sm={6}>
          <Date
            cancelLabel={true}
            label={"תאריך סיום חוזה"}
            disabled={false}
            value={tenant.endDate}
            ref={finishDateRef}
            errorComment={error}
          />
        </Grid>
      </Grid>
      <Button onClick={handleSubmit}>שמור</Button>
    </div>
  );
}
