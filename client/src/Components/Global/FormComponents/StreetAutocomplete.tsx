import { Autocomplete, TextField } from "@mui/material";
import { forwardRef, Ref, SyntheticEvent, useMemo, useState } from "react";
import "../../../Layout/CSS/Form.css";
import FormLayout from "../../../Layout/FormLayout";
import HttpService from "../../../Services/HttpService";

interface StreetAutocompleteProps {
  label: string;
  error?: string;
  defaultValue?: string;
  city: string;
}

function StreetAutocomplete(
  { label, defaultValue, error, city }: StreetAutocompleteProps,
  ref: Ref<any>,
) {
  const [currentList, setCurrentList] = useState<string[]>([]);
  const [value, setValue] = useState<string>(defaultValue ?? "");

  useMemo(() => {
    if (city) {
      HttpService.getStreetsByCity(city).then((results) => {
        const removeDuplicate = results.filter(
          (item: string, index: number) => results.indexOf(item) === index,
        );
        setCurrentList(removeDuplicate);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const onChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string,
  ) => {
    setValue(newInputValue);
  };

  return (
    <FormLayout label={label} error={error}>
      <Autocomplete
        disabled={!city}
        disablePortal
        className={error ? "error-border autocomplete" : "autocomplete"}
        options={currentList}
        value={value}
        inputValue={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue ?? "");
        }}
        onInputChange={onChange}
        renderInput={(params) => <TextField {...params} inputRef={ref} />}
      />
    </FormLayout>
  );
}

const forwaredStreetAutocompleteInput = forwardRef(StreetAutocomplete);
export default forwaredStreetAutocompleteInput;
