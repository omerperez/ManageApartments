import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import ThemeStyleRTL from "../../../Layout/ThemeStyleRTL";

export default function PasswordInput() {
  return (
    <ThemeStyleRTL>
      <TextField
        id="filled-start-adornment"
        InputProps={{
          startAdornment: <InputAdornment position="start">kg</InputAdornment>,
        }}
        variant="outlined"
      />
    </ThemeStyleRTL>
  );
}
