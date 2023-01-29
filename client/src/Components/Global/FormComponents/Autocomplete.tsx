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
      HttpService.getAllCities().then((results) => {
        setCurrentList(results as ISelectMenuItem[]);
      });
    }
    if (isStreetAutocomplete && !disabled) {
      HttpService.getStreetsByCity(isStreetAutocomplete).then((results) => {
        setCurrentList(results);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStreetAutocomplete, disabled]);

  const getCurrentValue = (value: string) => {
    return currentList.find((item) => item.label.includes(value));
    // return findItem;
  };

  const onChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string,
  ) => {
    console.log(newInputValue);
    setState && setState(newInputValue);
    setCurrentValue(newInputValue);
    // return newInputValue;
  };

  if (currentList.length === 0) {
    return null;
  }

  return (
    <FormLayout label={label} error={error}>
      <Autocomplete
        disablePortal
        disabled={disabled}
        className={error ? "error-border autocomplete" : "autocomplete"}
        options={currentList}
        placeholder={currentValue}
        renderInput={(params) => <TextField {...params} inputRef={ref} />}
      />
    </FormLayout>
  );
}

const forwaredAutocompleteInput = forwardRef(AutocompleteInput);
export default forwaredAutocompleteInput;
