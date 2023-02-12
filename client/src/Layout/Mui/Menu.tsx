import { SxProps, Theme } from "@mui/material";

const MuiSideMenuButtonIcon: SxProps<Theme> = {
  // color: "#2A2561",
  color: "white",
  fontSize: 42,
};

const MuiPapperMobileMenu = {
  position: "fixed",
  bottom: -0.5,
  left: 0,
  right: 0,
  zIndex: 10,
  height: 50,
};

const MuiMobileMenuButton = {
  background: "#0b6efe",
  "& .css-imwso6-MuiBottomNavigationAction-label": {
    color: "#b9e1ff",
  },
  "& .css-i4bv87-MuiSvgIcon-root": {
    color: "#b9e1ff",
  },
};

const MuiMobileMenuButtonActive = {
  "& .css-imwso6-MuiBottomNavigationAction-label": {
    color: "white",
  },
  "& .css-i4bv87-MuiSvgIcon-root": {
    color: "white",
  },
};

export {
  MuiSideMenuButtonIcon,
  MuiMobileMenuButton,
  MuiPapperMobileMenu,
  MuiMobileMenuButtonActive,
};
