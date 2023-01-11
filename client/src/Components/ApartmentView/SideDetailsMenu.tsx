import { IconButton, Stack } from "@mui/material";
import { sideDetialsMenuItems } from "../../Assets/Profile";

interface SideDetailsMenuProps {
  activeButton: number;
  changeActiveButton: (index: number) => void;
}
export default function SideDetailsMenu({
  activeButton,
  changeActiveButton,
}: SideDetailsMenuProps) {
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
{
}
