import { Grid } from "@mui/material";
import { useState } from "react";
import { StepsLabels } from "../Assets/Create";
import ApartmentPart from "../Components/Create/ApartmentPart";
import FilesPart from "../Components/Create/FilesPart";
import StepperForm from "../Components/Create/Stepper";
import TenantPart from "../Components/Create/TenantPart";
import "../Layout/CSS/Create.css";

export default function Create() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const FormSectionsFlow = [
    <ApartmentPart setStep={setActiveStep} />,
    <TenantPart setStep={setActiveStep} isEditTenant={false} />,
    <FilesPart />,
  ];
  return (
    <div className="create-form-layout">
      <Grid container sx={{ height: "80vh" }}>
        <Grid item sm={2}>
          <StepperForm steps={StepsLabels} activeStep={activeStep} />
        </Grid>
        <Grid item sm={10} className="create-white-form">
          {FormSectionsFlow[activeStep]}
        </Grid>
      </Grid>
    </div>
  );
}
