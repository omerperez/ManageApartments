import { Autocomplete, TextField } from "@mui/material";
import {
  Dispatch,
  forwardRef,
  Ref,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import "../../../Layout/CSS/Form.css";
import FormLayout from "../../../Layout/FormLayout";
import HttpService from "../../../Services/HttpService";

interface CityAutocompleteProps {
  label: string;
  error?: string;
  defaultValue?: string;
  setState: Dispatch<SetStateAction<string>>;
}

function CityAutocomplete(
  { label, defaultValue, setState, error }: CityAutocompleteProps,
  ref: Ref<any>,
) {
  const [currentList, setCurrentList] = useState<string[]>([]);
  const [value, setValue] = useState<string>(defaultValue ?? "");

  useEffect(() => {
    HttpService.getAllCities().then((results) => {
      setCurrentList(results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string,
  ) => {
    setState(newInputValue);
  };

  return (
    <FormLayout label={label} error={error}>
      <Autocomplete
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

const forwaredCityAutocompleteInput = forwardRef(CityAutocomplete);
export default forwaredCityAutocompleteInput;
