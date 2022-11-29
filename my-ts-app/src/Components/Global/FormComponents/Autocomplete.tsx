import { Autocomplete, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, ReactEventHandler } from "react";
import ThemeStyleRTL from "../ThemeStyleRTL";

interface IMenuSelectItem {
  label: string;
  value: string | number;
}

interface AutocompleteProps {
  list: IMenuSelectItem[];
  name: string;
  cancelLabel?: boolean;
  label?: string;
  className?: string;
  onChange?: (e: ChangeEvent<any>) => void;
  value?: string | number;
  disabled?: boolean;
}

export default function AutocompleteInput({
  list,
  name,
  cancelLabel,
  label,
  onChange,
  value,
  disabled,
}: AutocompleteProps) {
  return (
    <ThemeStyleRTL>
      {!cancelLabel && (
        <b>
          <span className="label-form">{label}</span>
          <br />
        </b>
      )}
      <Autocomplete
        disablePortal
        disabled={disabled ?? false}
        sx={{ backgroundColor: "white", marginTop: 0.05 }}
        id="combo-box-demo"
        options={list}
        value={{ label: value as string, value: value }}
        onChange={onChange}
        // sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            name={name}
            // onChange={onChange}
            // value={value}
            {...params}
            label={label}
          />
        )}
      />
    </ThemeStyleRTL>
  );
}
