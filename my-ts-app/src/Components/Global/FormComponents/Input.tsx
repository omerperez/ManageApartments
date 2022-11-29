import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";
import ThemeStyleRTL from "../ThemeStyleRTL";

interface InputProps {
  cancelLabel: boolean;
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  className: string;
  type?: string;
  disabled?: boolean;
  error?: string;
}
export default function Input({
  cancelLabel,
  label,
  name,
  value,
  onChange,
  required,
  className,
  type,
  disabled,
  error,
}: InputProps) {
  return (
    <ThemeStyleRTL>
      <div>{!cancelLabel && <b className="label-form">{label}</b>}</div>
      <TextField
        fullWidth
        name={name}
        type={type ?? "text"}
        required={required ?? false}
        disabled={disabled ?? false}
        variant={disabled ? "filled" : "outlined"}
        value={value}
        className={className}
        onChange={onChange}
      />
      <div className="input-error">{error}</div>
    </ThemeStyleRTL>
  );
}
