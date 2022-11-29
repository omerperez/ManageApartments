import React from "react";
import { IconButton, Grid } from "@mui/material";

type Props = {
  item: any;
  isActive: Boolean;
  index: number;
};

export default function MenuButton({ item, isActive, index }: Props) {
  return (
    <IconButton
      className={isActive ? "apartment-btn-active" : "apartment-btn-non-active"}
      key={`menu-item-btn${index}`}
      color="primary"
      aria-label="upload picture"
      component="label"
    >
      {item.icon}
    </IconButton>
  );
}
