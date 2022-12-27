import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { Dispatch, Ref, SetStateAction, useRef, useState } from "react";
import { ITenant } from "../../../Data/interfaces/ITenant";
import { convertDateFormatToDayJS } from "../../../Features/Format";
import TenantsCard from "../../ApartmentProfile/TenantsCard";
import UploadPDF from "../../Create/ManageFiles/UploadPDF";
import Date from "../../Global/FormComponents/Date";
import EditButtons from "../EditButtons";

interface ExtendAgreementProps {
  tenant: ITenant;
  language: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ExtendAgreement({
  tenant,
  language,
  setOpen,
}: ExtendAgreementProps) {
  const [error, setError] = useState<string>("");
  const [doc, setDoc] = useState<string>("");
  const finishDateRef: Ref<any> = useRef();

  const isDateFuture = (date: string) => {
    if (date) {
      const dateValue = convertDateFormatToDayJS(date);
      return dayjs().isBefore(dateValue);
    }
    return false;
  };

  const sendDateToServer = () => {
    // do somthing
  };
  const handleSubmit = () => {
    const value = finishDateRef.current.value;
    if (isDateFuture(value)) {
      sendDateToServer();
      setError("");
      setOpen(false);
    }
    return setError("ערך לא חוקי");
  };

  return (
    <>
      <div className="sub-page-title">{"הארכת חוזה"}</div>
      <Grid container>
        <Grid item sm={6} className="d-flex justify-content-center">
          <TenantsCard
            sx={{
              maxWidth: "90%",
              boxShadow: "5px 5px 15px -5px rgba(0, 0, 0, 0.75)",
            }}
            currentTenant={tenant}
            language={language}
            isEditDialog={true}
          />
        </Grid>
        <Grid item sm={6}>
          <Stack spacing={1}>
            <Date
              label={"תאריך סיום חוזה מעודכן"}
              value={tenant.endDate}
              ref={finishDateRef}
              errorComment={error}
            />
            <div>
              <UploadPDF
                pdf={doc}
                setPdf={setDoc}
                buttonClassName="extend-agreement-file-btn"
                textButton={"צרף הארכת חוזה"}
              />
              {!doc && <div className="input-error">{"שדה חובה"}</div>}
            </div>
          </Stack>
        </Grid>
      </Grid>
      <div className="mt-3">
        <EditButtons onSave={handleSubmit} onCancel={() => setOpen(false)} />
      </div>
    </>
  );
}
