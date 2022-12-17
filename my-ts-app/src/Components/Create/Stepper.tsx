import { Step, StepLabel, Stepper } from "@mui/material";
import { useContext } from "react";
import { StepperStyle } from "../../Assets/Create";
import { AuthContext } from "../../Contexts/AuthContext";
import { AuthContextType } from "../../Data/types/Auth";
import "../../Layout/CSS/Create.css";
import ThemeStyleRTL from "../../Layout/ThemeStyleRTL";

interface StepperProps {
  steps: { he_label: string; en_label: string }[];
  activeStep: number;
}

export default function StepperForm({ steps, activeStep }: StepperProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;

  return (
    <ThemeStyleRTL>
      <Stepper
        activeStep={activeStep}
        sx={StepperStyle}
        orientation="vertical"
        // alternativeLabe
      >
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
