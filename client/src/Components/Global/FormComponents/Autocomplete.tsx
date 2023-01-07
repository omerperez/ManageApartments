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
import { ISelectMenuItem } from "../../../Data/interfaces/Form.interface";
import FormLayout from "../../../Layout/FormLayout";
import "../../../Layout/CSS/Form.css";
import HttpService from "../../../Services/HttpService";

interface AutocompleteProps {
  label: string;
  error?: string;
  list?: ISelectMenuItem[];
  defaultValue?: string;
  disabled: boolean;
  setState?: Dispatch<SetStateAction<string>>;
  isCityAutocomplete?: boolean;
  isStreetAutocomplete?: string;
}

function AutocompleteInput(
  {
    label,
    list,
    defaultValue,
    disabled,
    setState,
    error,
    isCityAutocomplete,
    isStreetAutocomplete,
  }: AutocompleteProps,
  ref: Ref<any>,
) {
  const [currentValue, setCurrentValue] = useState<string>(defaultValue ?? "");
  const [currentList, setCurrentList] = useState<ISelectMenuItem[]>(list ?? []);

  useEffect(() => {
    if (isCityAutocomplete) {
      HttpService.getAllCities().then((results) => setCurrentList(results));
    }
    if (isStreetAutocomplete && !disabled) {
      HttpService.getStreetsByCity(isStreetAutocomplete).then((results) => {
        setCurrentList(results);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStreetAutocomplete, disabled]);

  const getCurrentValue = (currentValue: string) => {
    return {
      label: currentValue,
      value: currentValue,
    };
  };

  const onChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string,
  ) => {
    setState && setState(newInputValue);
    setCurrentValue(newInputValue);
    // return newInputValue;
  };

  return (
    <FormLayout label={label} error={error}>
      <Autocomplete
        disablePortal
        disabled={disabled}
        className={error ? "error-border autocomplete" : "autocomplete"}
        options={currentList}
        value={getCurrentValue(currentValue)}
        onInputChange={onChange}
        renderInput={(params) => <TextField {...params} inputRef={ref} />}
      />
    </FormLayout>
  );
}

const forwaredAutocompleteInput = forwardRef(AutocompleteInput);
export default forwaredAutocompleteInput;
