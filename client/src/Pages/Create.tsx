import { Grid } from "@mui/material";
import { useContext } from "react";
import { StepsLabels } from "../Assets/Create";
import CreateForm from "../Components/Create/CreateForm";
import Stepper from "../Components/Create/Stepper/Stepper";
import { PrivateContext } from "../Contexts/Private";
import { PrivateContextType } from "../Data/types/Private";
import "../Layout/CSS/Create.css";

export default function Create() {
  const { privateState } = useContext(PrivateContext) as PrivateContextType;

  return (
    <div className="create-form-layout">
      <Grid container className="create-grid-layout">
        <Grid item sm={2}>
          <Stepper steps={StepsLabels} activeStep={privateState.activeStep} />
        </Grid>
        <Grid item sm={10} className="padding-creates-form">
          {CreateForm[privateState.activeStep]}
        </Grid>
      </Grid>
    </div>
  );
}
