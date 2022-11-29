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

  return [state, onChange, onSelectChange];
};

export default useForm;
