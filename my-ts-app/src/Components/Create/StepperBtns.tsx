import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { PrivateContext } from "../../Contexts/Private";
import { AuthContextType } from "../../Data/types/Auth";
import { PrivateContextType } from "../../Data/types/Private";

interface StepperBtnsProps {
  next: () => void;
  back: () => void;
}

export default function StepperBtns({ next, back }: StepperBtnsProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const { privateState } = useContext(PrivateContext) as PrivateContextType;

  return (
    <Grid container className="mt-3">
      <Grid item sm={6} className="text-start">
        <Button
          className="stepper-btn"
          variant="contained"
          disabled={!privateState.steps.apartment}
          onClick={back}
          sx={{ mr: 1 }}
        >
          {authState.language === "en" ? "Back" : "חזור"}
        </Button>
      </Grid>
      <Grid item sm={6} className="text-end">
        <Button
          onClick={next}
          disabled={privateState.steps.files}
          className="stepper-btn next-btn"
          variant="outlined"
        >
          {privateState.steps.files
            ? authState.language === "en"
              ? "Create"
              : "צור דירה"
            : authState.language === "en"
            ? "Next"
            : "המשך"}
        </Button>
      </Grid>
    </Grid>
  );
}
