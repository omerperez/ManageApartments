import { Step, StepLabel, Stepper } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ITranslateLabel } from "../../../Data/interfaces/Create";
import { AuthContextType } from "../../../Data/types/Auth";
import { SxMuiStepper } from "../../../Layout/Mui/Create";
import ThemeStyleRTL from "../../../Layout/ThemeStyleRTL";

interface StepperProps {
  steps: ITranslateLabel[];
  activeStep: number;
}

export default function StepperForm({ steps, activeStep }: StepperProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;

  return (
    <ThemeStyleRTL>
      <Stepper activeStep={activeStep} sx={SxMuiStepper} orientation="vertical">
        {steps.map((step) => {
          return (
            <Step key={step.en_label}>
              <StepLabel>{step[`${authState.language}_label`]}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </ThemeStyleRTL>
  );
}
