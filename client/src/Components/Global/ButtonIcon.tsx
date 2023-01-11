import { Button, Grid } from "@mui/material";
import { ReactNode } from "react";

interface ButtonIconProps {
  icon: ReactNode;
  className: string;
  text: string;
}
export default function ButtonIcon({ text, className, icon }: ButtonIconProps) {
  return (
    <Button fullWidth className={className}>
      <Grid container spacing={1}>
        <Grid item sm={7.5} textAlign="end">
          {text}
        </Grid>
        <Grid item sm={4.5} textAlign="start">
          {icon}
        </Grid>
      </Grid>
    </Button>
  );
}
