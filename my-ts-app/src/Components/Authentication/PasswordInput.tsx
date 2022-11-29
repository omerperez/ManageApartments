import React from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ThemeStyleRTL from "../Global/ThemeStyleRTL";

interface PasswordProp{
    label: string;
    sx: Object;
}
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
