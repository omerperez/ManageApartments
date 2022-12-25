import { Grid, TextareaAutosize } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { apartmentFormLabels } from "../../../Assets/Create";
import { AuthContext } from "../../../Contexts/AuthContext";
import { PrivateContext } from "../../../Contexts/Private";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import { PrivateContextType } from "../../../Data/types/Private";
import {
  getFieldsErrorStatus,
  isFormFieldsErrors,
} from "../../../Services/Global";
import Autocomplete from "../../Global/FormComponents/Autocomplete";
import Input from "../../Global/FormComponents/Input";
import Select from "../../Global/FormComponents/Select";
import StepperBtns from "../Stepper/StepperButtons";

export default function ApartmentForm() {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const { privateState, setStep } = useContext(
    PrivateContext,
  ) as PrivateContextType;
  const [city, setCity] = useState<string>("");
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(apartmentFormLabels.map(() => createRef()));

  const handleClickNext = () => {
    // const valuesSelectLists = [];
    const list = getFieldsErrorStatus(
      apartmentFormLabels,
      refs,
      // valuesSelectLists,
    );
    if (isFormFieldsErrors(list)) {
      setErrorList(list);
      setStep(privateState.activeStep + 1);
    } else {
      setErrorList({});
      setStep(privateState.activeStep + 1);
      // setStep && setStep((prevActiveStep) => prevActiveStep + 1);
      // changeStepStatus("apartment", true);
    }
  };

  const title = "פרטי הדירה";
  return (
    <div>
      <div style={{ height: "80%" }}>
        <div className="sub-page-title">{title}</div>
        <Grid container spacing={1.5}>
          {apartmentFormLabels.map((item, index) =>
            item.name === "comments" ? (
              <TextareaAutosize
                key={`textarea-apartment-${index}`}
                className="area-input"
                aria-label={`${item[authState.language]}-label`}
                minRows={5}
                placeholder={item[`${authState.language}_label`]}
                ref={refs.current[index]}
              />
            ) : item.type === "input" ? (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Input
                  textType={item.type}
                  label={item[`${authState.language}_label`]}
                  value={privateState.apartment[item.name]}
                  error={errorList[item.name] === false ? item.error : ""}
                  required={true}
                  ref={refs.current[index]}
                />
              </Grid>
            ) : item.type === "autocomplete" ? (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Autocomplete
                  label={item[`${authState.language}_label`]}
                  error={errorList[item.name] === false ? item.error : ""}
                  disabled={item.name === "street" && !city ? true : false}
                  ref={refs.current[index]}
                  setState={setCity}
                  isCityAutocomplete={item.name === "city"}
                  isStreetAutocomplete={item.name === "street" ? city : ""}
                />
              </Grid>
            ) : (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Select
                  label={item[`${authState.language}_label`]}
                  value={privateState.apartment[item.name]}
                  error={errorList[item.name] === false ? item.error : ""}
                  disabled={false}
                  list={item.list ?? []}
                  ref={refs.current[index]}
                />
              </Grid>
            ),
          )}
        </Grid>
      </div>
      <StepperBtns next={handleClickNext} back={() => {}} />
    </div>
  );
}
