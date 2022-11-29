import { Button, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { Dispatch, SetStateAction, useContext } from "react";
import { StepperStyle } from "../../Assets/Create";
import { AuthContext } from "../../Contexts/AuthContext";
import ThemeStyleRTL from "../Global/ThemeStyleRTL";
import "../../Layout/CSS/Create.css";

interface StepperProps {
  steps: { he_label: string; en_label: string }[];
  children?: any;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

export default function StepperForm({
  children,
  steps,
  activeStep,
  setActiveStep,
}: StepperProps) {
  const { state } = useContext(AuthContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <div className="h-550 mb-2">
        <ThemeStyleRTL>
          <div>
            <Stepper activeStep={activeStep} sx={StepperStyle} alternativeLabel>
              {steps.map((step) => {
                return (
                  <Step key={step.en_label}>
                    <StepLabel>{step[`${state.language}_label`]}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
        </ThemeStyleRTL>
        <div className="mt-4">{children}</div>
      </div>
      <Grid container className="mt-3">
        <Grid item sm={6} className="text-start">
          <Button
            className="stepper-btn"
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            {state.language === "en" ? "Back" : "חזור"}
          </Button>
        </Grid>
        <Grid item sm={6} className="text-end">
          <Button
            onClick={handleNext}
            disabled={activeStep === 3}
            className="stepper-btn next-btn"
            variant="outlined"
          >
            {activeStep >= steps.length - 1
              ? state.language === "en"
                ? "Create"
                : "צור דירה"
              : state.language === "en"
              ? "Next"
              : "המשך"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
