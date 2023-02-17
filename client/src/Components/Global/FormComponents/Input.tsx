import { SxProps, Theme, TextField } from "@mui/material";
import { ChangeEvent, forwardRef, Ref, useState } from "react";
import FormLayout from "../../../Layout/FormLayout";

interface InputProps {
  label: string;
  value: string;
  textType: string;
  required: boolean;
  disabled?: boolean;
  error?: string;
  sx?: SxProps<Theme>;
  variant?: "standard" | "filled" | "outlined";
}
function Input(
  {
    label,
    value,
    error,
    disabled,
    required,
    sx,
    textType,
    variant,
  }: InputProps,
  ref: Ref<any>,
) {
  const [currentValue, setCurrentValue] = useState<string>(value);

  let currentVariant: "standard" | "filled" | "outlined" = "outlined";
  if (variant) {
    currentVariant = variant;
  }
  if (disabled) {
    currentVariant = "filled";
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  return (
    <FormLayout label={label} error={error}>
      <TextField
        fullWidth
        label={label}
        type={textType}
        required={required ?? false}
        disabled={disabled ?? false}
        variant={currentVariant}
        value={currentValue}
        sx={sx ? sx : null}
        className={error ? "bg-white error-border" : "bg-white"}
        onChange={handleChange}
        inputRef={ref}
      />
    </FormLayout>
  );
}

const forwaredInput = forwardRef(Input);
export default forwaredInput;
