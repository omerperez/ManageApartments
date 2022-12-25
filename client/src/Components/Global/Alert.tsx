import { Error } from "@mui/icons-material";
import { Grid } from "@mui/material";

interface AlertProps {
  text: string;
}

export default function Alert({ text }: AlertProps) {
  return (
    <div className="alert-error">
      <Grid container>
        <Grid item sm={10.5} className="m-auto">
          {text}
        </Grid>
        <Grid item sm={1.5}>
          <Error className="error-icon" />
        </Grid>
      </Grid>
    </div>
  );
}
