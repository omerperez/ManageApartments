import React, { ChangeEvent, useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ThemeStyleRTL from "../ThemeStyleRTL";

interface IMenuSelectItem {
  label: string;
  value: string | number;
}

interface SelectProps {
  list: IMenuSelectItem[];
  name: string;
  cancelLabel?: boolean;
  label?: string;
  className?: string;
  onChange?: (e: SelectChangeEvent<string | number>) => void;
  value?: string | number;
}
export default function SelectLabels({
  list,
  name,
  cancelLabel,
  label,
  className,
  onChange,
  value,
}: SelectProps) {
  return (
    <ThemeStyleRTL>
      {!cancelLabel && (
        <b>
          <span className="label-form">{label}</span>
          <br />
        </b>
      )}
      <Select
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          // getContentAnchorEl: null,
        }}
        sx={{ backgroundColor: "white", marginTop: 0.05 }}
        value={value}
        onChange={onChange}
        displayEmpty
        className={className ? className : ""}
        fullWidth
        inputProps={{ "aria-label": "Without label" }}
        name={name}
      >
        {list.map((item, key) => (
          <MenuItem
            sx={{ direction: "ltr" }}
            value={item.value}
            key={`menu-item-${key}`}
          >
            {item.value === "" ? <em>{item.label}</em> : item.label}
          </MenuItem>
        ))}
      </Select>
    </ThemeStyleRTL>
  );
}
export type { IMenuSelectItem };
