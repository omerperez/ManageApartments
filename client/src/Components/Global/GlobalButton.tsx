import { Button, Grid } from "@mui/material";
import "../../Layout/CSS/Profile.css";

type ButtonProp = {
  classStyle: string;
  text: string;
  icon: JSX.Element | null;
  fullWidth: boolean | false;
  onClick?: () => void;
};

export default function GlobalButton({
  classStyle,
  text,
  icon,
  fullWidth,
  onClick,
}: ButtonProp) {
  return (
    <Button
      onClick={onClick}
      size="large"
      variant="outlined"
      fullWidth={fullWidth ?? false}
      className={`${classStyle} global-btn`}
    >
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sm={icon ? 10 : 12}
          className="text-center project-font"
        >
          {text}
        </Grid>
        {icon && (
          <Grid item xs={0} sm={2} className="d-flex justify-content-center">
            {icon}
          </Grid>
        )}
      </Grid>
    </Button>
  );
}
