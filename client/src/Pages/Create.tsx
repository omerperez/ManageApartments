import { Grid } from "@mui/material";
import { useState } from "react";
import { StepsLabels } from "../Assets/Create";
import ApartmentForm from "../Components/Create/CreateForms/ApartmentForm";
import AttachFilesFrom from "../Components/Create/CreateForms/AttachFilesFrom";
import TenantForm from "../Components/Create/CreateForms/TenantForm";
import Stepper from "../Components/Create/Stepper/Stepper";
import "../Layout/CSS/Create.css";

export default function Create() {
  // const { privateState } = useContext(PrivateContext) as PrivateContextType;
  const [activeStep, setActiveStep] = useState<number>(0);

  const forms = [
    <ApartmentForm setActiveStep={setActiveStep} />,
    <TenantForm isEditTenant={false} setActiveStep={setActiveStep} />,
    <AttachFilesFrom setActiveStep={setActiveStep} />,
  ];
  return (
    <div className="create-form-layout">
      <Grid container className="create-grid-layout">
        <Grid item sm={2}>
          <Stepper steps={StepsLabels} activeStep={activeStep} />
        </Grid>
        <Grid item sm={10} className="padding-creates-form">
          {forms[activeStep]}
        </Grid>
      </Grid>
    </div>
  );
}
