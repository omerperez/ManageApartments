import { TextField } from "@mui/material";
import { ChangeEvent, forwardRef, Ref, useState } from "react";
import FormLayout from "../../../Layout/FormLayout";

interface InputProps {
  label: string;
  value: string;
  textType: string;
  disabled?: boolean;
  error?: string;
  required: boolean;
}
function Input(
  { label, value, error, disabled, required, textType }: InputProps,
  ref: Ref<any>,
) {
  const [currentValue, setCurrentValue] = useState<string>(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  return (
    <FormLayout label={label} error={error}>
      <TextField
        fullWidth
        type={textType}
        required={required ?? false}
        disabled={disabled ?? false}
        variant={disabled ? "filled" : "outlined"}
        value={currentValue}
        className={error ? "bg-white error-border" : "bg-white"}
        onChange={handleChange}
        inputRef={ref}
      />
    </FormLayout>
  );
}

const forwaredInput = forwardRef(Input);
export default forwaredInput;
