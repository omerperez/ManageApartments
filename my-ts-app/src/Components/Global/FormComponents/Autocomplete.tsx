import { Autocomplete, TextField } from "@mui/material";
import { Dispatch, forwardRef, Ref, SetStateAction, useState } from "react";
import { ISelectMenuItem } from "../../../Data/interfaces/IForm";
import FormLayout from "../../../Layout/FormLayout";

interface AutocompleteProps {
  label: string;
  error?: string;
  list: ISelectMenuItem[];
  defaultValue?: string;
  disabled: boolean;
  setState?: Dispatch<SetStateAction<string>>;
}

function AutocompleteInput(
  { label, list, defaultValue, disabled, setState, error }: AutocompleteProps,
  ref: Ref<any>,
) {
  const [currentValue, setCurrentValue] = useState(defaultValue ?? "");
  const MuiAutocomplete = { backgroundColor: "white", marginTop: 0.05 };
  return (
    <FormLayout label={label} error={error}>
      <Autocomplete
        disablePortal
        disabled={disabled}
        className={error ? "error-border" : ""}
        sx={MuiAutocomplete}
        options={list}
        value={{
          label: currentValue,
          value: currentValue,
        }}
        onInputChange={(event, newInputValue) => {
          setState && setState(newInputValue);
          setCurrentValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} inputRef={ref} />}
      />
    </FormLayout>
  );
}

const forwaredAutocompleteInput = forwardRef(AutocompleteInput);
export default forwaredAutocompleteInput;
