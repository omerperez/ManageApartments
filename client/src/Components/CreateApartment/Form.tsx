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
import { apartmentFormLabels } from "../../Assets/Create";
import { AuthContext } from "../../Contexts/AuthContext";
import { CreateApartmentDto } from "../../Data/interfaces/dto/CreateApartmentDto";
import { IErrosListObject } from "../../Data/interfaces/IValidation";
import { AuthContextType } from "../../Data/types/Auth";
import {
  getApartmentFormObject,
  getInputType,
  getSelectList,
} from "../../Services/FormService";
import { getSubmitFormValues } from "../../Services/Global";
import EditButtons from "../Edit/EditButtons";
import Autocomplete from "../Global/FormComponents/Autocomplete";
import Input from "../Global/FormComponents/Input";
import Select from "../Global/FormComponents/Select";

interface CreateApartmentFormProps {
  setApartmentDetails: Dispatch<SetStateAction<CreateApartmentDto | null>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function CreateApartmentForm({
  setApartmentDetails,
  setStep,
}: CreateApartmentFormProps) {
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
      setApartmentDetails({
        ...getApartmentFormObject(values),
        mainImageIndex: 0,
      } as CreateApartmentDto);
      setStep(1);
    } else {
      setErrorList(errorList as IErrosListObject);
    }
  };

  const APARTMENT_DETAILS_TITLE = "פרטי הדירה";
  return (
    <div className="edit-form">
      <div style={{ height: "80%" }}>
        <div className="sub-page-title">{APARTMENT_DETAILS_TITLE}</div>
        <Grid container spacing={1.5}>
          {apartmentFormLabels.map((item, index) =>
            item.key === "comments" ? (
              <TextareaAutosize
                key={`textarea-apartment-${index}`}
                className="area-input"
                aria-label={`${item[authState.language]}-label`}
                minRows={5}
                defaultValue={""}
                placeholder={item[`${authState.language}_label`]}
                ref={refs.current[index]}
              />
            ) : item.type.fieldType === "input" ? (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Input
                  textType={getInputType(item)}
                  label={item[`${authState.language}_label`]}
                  value={""}
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
                  defaultValue={""}
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
      <div className="mt-2">
        <EditButtons onSave={onSubmit} onCancel={() => {}} />
      </div>
    </div>
  );
}
