import { SxProps, Theme } from "@mui/material";

const DialogTenantMui: SxProps<Theme> = {
  direction: "ltr",
  "& .muirtl-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: 1300,
    height: "58%",
    border: "solid 3px #809fff",
  },
};

const DialogImagesMui: SxProps<Theme> = {
  direction: "ltr",
  "& .muirtl-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    minWidth: 1300,
    maxWidth: 1300,
    height: "80%",
    border: "solid 3px #809fff",
  },
};

const DialogSelectEditTenantTypeMui: SxProps<Theme> = {
  direction: "ltr",
  "& .muirtl-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    minWidth: 1300,
    maxWidth: 1300,
    height: "auto",
    border: "solid 3px #809fff",
  },
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    minWidth: 1300,
    maxWidth: 1300,
    height: "auto",
    border: "solid 3px #809fff",
  },
};

export { DialogTenantMui, DialogImagesMui, DialogSelectEditTenantTypeMui };
