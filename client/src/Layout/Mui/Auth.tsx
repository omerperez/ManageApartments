import { SxProps, Theme } from "@mui/material";

const AuthInputMui: SxProps<Theme> = {
  borderRadius: "8px",
  "& .muirtl-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
    height: "60px",
    border: "solid 1px #887E7E",
    fontFamily: `"Rubik", sans-serif`,
  },
};

const AuthInputErrorMui: SxProps<Theme> = {
  borderRadius: "8px",
  "& .muirtl-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
    height: "60px",
    border: "solid 1px #DC3545",
    fontFamily: `"Rubik", sans-serif`,
  },
};

export { AuthInputMui, AuthInputErrorMui };
