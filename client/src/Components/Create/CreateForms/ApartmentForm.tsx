import { Grid, TextareaAutosize } from "@mui/material";
import {
  createRef,
  Dispatch,
  Ref,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { apartmentFormLabels } from "../../../Assets/Create";
import { AuthContext } from "../../../Contexts/AuthContext";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import { getInputType, getSelectList } from "../../../Services/FormService";
import {
  getFieldsErrorStatus,
  isFormFieldsErrors,
} from "../../../Services/Global";
import Autocomplete from "../../Global/FormComponents/Autocomplete";
import Input from "../../Global/FormComponents/Input";
import Select from "../../Global/FormComponents/Select";
import StepperBtns from "../Stepper/StepperButtons";

interface ApartmentFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
}
export default function ApartmentForm({ setActiveStep }: ApartmentFormProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [city, setCity] = useState<string>("");
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(apartmentFormLabels.map(() => createRef()));

  const handleClickNext = () => {
    const list = getFieldsErrorStatus(apartmentFormLabels, refs);
    if (isFormFieldsErrors(list)) {
      setErrorList(list);
      setActiveStep(1);
    } else {
      setErrorList({});
      setActiveStep(1);
    }
  };

  const title = "פרטי הדירה";
  return (
    <div>
      <div style={{ height: "80%" }}>
        <div className="sub-page-title">{title}</div>
        <Grid container spacing={1.5}>
          {apartmentFormLabels.map((item, index) =>
            item.key === "comments" ? (
              <TextareaAutosize
                key={`textarea-apartment-${index}`}
                className="area-input"
                aria-label={`${item[authState.language]}-label`}
                minRows={5}
                placeholder={item[`${authState.language}_label`]}
                ref={refs.current[index]}
              />
            ) : item.type.fieldType === "input" ? (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Input
                  textType={getInputType(item)}
                  label={item[`${authState.language}_label`]}
                  value={""}
                  error={errorList[item.key] === false ? item.error : ""}
                  required={true}
                  ref={refs.current[index]}
                />
              </Grid>
            ) : item.type.fieldType === "autocomplete" ? (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Autocomplete
                  label={item[`${authState.language}_label`]}
                  error={errorList[item.key] === false ? item.error : ""}
                  disabled={item.key === "street" && !city ? true : false}
                  ref={refs.current[index]}
                  setState={setCity}
                  isCityAutocomplete={item.key === "city"}
                  isStreetAutocomplete={item.key === "street" ? city : ""}
                />
              </Grid>
            ) : (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Select
                  label={item[`${authState.language}_label`]}
                  value={""}
                  error={errorList[item.key] === false ? item.error : ""}
                  disabled={false}
                  list={getSelectList(item)}
                  ref={refs.current[index]}
                />
              </Grid>
            ),
          )}
        </Grid>
      </div>
      <StepperBtns next={handleClickNext} back={() => {}} activeStep={0} />
    </div>
  );
}
