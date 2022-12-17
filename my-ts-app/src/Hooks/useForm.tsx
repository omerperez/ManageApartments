import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useForm = () => {
  const [state, setState] = useState<any>({});
  //"formValues", {});

  function onChange(e: ChangeEvent<any>) {
    setState((state: any) => ({ ...state, [e.target.name]: e.target.value }));
  }

  function onSelectChange(e: SelectChangeEvent<any>) {
    setState((state: any) => ({ ...state, [e.target.name]: e.target.value }));
  }

  function changeState(key: any, value?: any) {
    if (value || value === false) {
      setState((current: any) => {
        return {
          ...current,
          [key]: value,
        };
      });
    } else {
      setState((current: any) => {
        const copy = { ...current };
        delete copy[key];
        return copy;
      });
    }
  }

  return [state, onChange, onSelectChange, changeState];
};

export default useForm;
