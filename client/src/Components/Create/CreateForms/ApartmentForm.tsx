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
import { IApartmentCreateForm } from "../../../Data/interfaces/Form.interface";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import {
  getApartmentFormObject,
  getFieldValue,
  getInputType,
  getSelectList,
} from "../../../Services/FormService";
import { getSubmitFormValues } from "../../../Services/Global";
import Autocomplete from "../../Global/FormComponents/Autocomplete";
import Input from "../../Global/FormComponents/Input";
import Select from "../../Global/FormComponents/Select";
import StepperBtns from "../Stepper/StepperButtons";

interface ApartmentFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  newApartment: IApartmentCreateForm | null;
  setNewApartment: Dispatch<SetStateAction<IApartmentCreateForm | null>>;
}

export default function ApartmentForm({
  setActiveStep,
  newApartment,
  setNewApartment,
}: ApartmentFormProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [city, setCity] = useState<string>("");
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(apartmentFormLabels.map(() => createRef()));

  const onSubmit = () => {
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      apartmentFormLabels,
      refs,
    );
    if (isFormPropper) {
      setErrorList({});
      const values = formValues as { [key: string]: string };
      const objData: IApartmentCreateForm = getApartmentFormObject(values);
    } else {
      setActiveStep(1);
      setErrorList(errorList as IErrosListObject);
    }
  };

  const handleClickNext = () => {
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      apartmentFormLabels,
      refs,
    );

    if (isFormPropper) {
      setErrorList({});
      const values = formValues as { [key: string]: string };
      const objData: IApartmentCreateForm = getApartmentFormObject(values);
      setNewApartment(objData);
      setActiveStep(1);
    } else {
      setActiveStep(1);
      setErrorList(errorList as IErrosListObject);
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
                defaultValue={newApartment?.comments}
                placeholder={item[`${authState.language}_label`]}
                ref={refs.current[index]}
              />
            ) : item.type.fieldType === "input" ? (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Input
                  textType={getInputType(item)}
                  label={item[`${authState.language}_label`]}
                  value={getFieldValue(item.key, newApartment)}
                  error={errorList[item.key]}
                  required={true}
                  ref={refs.current[index]}
                />
              </Grid>
            ) : item.type.fieldType === "autocomplete" ? (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Autocomplete
                  label={item[`${authState.language}_label`]}
                  error={errorList[item.key]}
                  disabled={item.key === "street" && !city ? true : false}
                  defaultValue={getFieldValue(item.key, newApartment)}
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
                  value={getFieldValue(item.key, newApartment)}
                  error={errorList[item.key]}
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
