import { Grid, IconButton, Stack } from "@mui/material";
import { sideDetialsMenuItems } from "../../Assets/Profile";
import useMobieDesign from "../../Hooks/useMobile";

interface SideDetailsMenuProps {
  activeButton: number;
  changeActiveButton: (index: number) => void;
}
export default function SideDetailsMenu({
  activeButton,
  changeActiveButton,
}: SideDetailsMenuProps) {
  const isMobileScreen = useMobieDesign();

  if (isMobileScreen) {
    return (
      <Grid container className="apartment-details-buttons-menu">
        {sideDetialsMenuItems.map((menuItem, index) => (
          <Grid
            item
            xs={3}
            textAlign="center"
            key={`side-menu-details-${index}-${menuItem.label}`}
          >
            <IconButton
              className={`apartment-details-button${
                activeButton === index ? "-active" : "-non-active"
              }`}
              key={`menu-item-btn${index}`}
              onClick={() => changeActiveButton(index)}
              aria-label="upload picture"
              component="label"
            >
              {menuItem.icon}
            </IconButton>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Stack className="apartment-details-buttons-menu">
      {sideDetialsMenuItems.map((menuItem, index) => (
        <IconButton
          className={`apartment-details-button${
            activeButton === index ? "-active" : "-non-active"
          }`}
          key={`menu-item-btn${index}`}
          onClick={() => changeActiveButton(index)}
          aria-label="upload picture"
          component="label"
        >
          {menuItem.icon}
        </IconButton>
      ))}
    </Stack>
  );
}
