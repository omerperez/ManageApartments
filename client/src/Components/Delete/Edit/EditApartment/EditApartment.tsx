import { Grid, TextareaAutosize } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apartmentFormLabels } from "../../../../Assets/Create";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { IApartment } from "../../../../Data/interfaces/IApartment";
import { IErrosListObject } from "../../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../../Data/types/Auth";
import { getInputType, getSelectList } from "../../../../Services/FormService";
import { getSubmitFormValues } from "../../../../Services/Global";
import CityAutocomplete from "../../../Global/FormComponents/CityAutocomplete";
import Input from "../../../Global/FormComponents/Input";
import Select from "../../../Global/FormComponents/Select";
import StreetAutocomplete from "../../../Global/FormComponents/StreetAutocomplete";
import EditButtons from "../EditButtons";

interface ApartmentPartProps {
  editApartment: IApartment;
}

export default function EditApartmentForm({
  editApartment,
}: ApartmentPartProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [city, setCity] = useState<string>("");
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const navigate = useNavigate();
  const refs: Ref<any> = useRef(apartmentFormLabels.map(() => createRef()));

  const onSubmit = () => {
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      apartmentFormLabels,
      refs,
    );

    if (isFormPropper) {
      setErrorList({});
      return navigate("/");
    } else {
      setErrorList(errorList as IErrosListObject);
    }
  };

  return (
    <>
      <Grid container spacing={1.5}>
        {apartmentFormLabels.map((item, index) =>
          item.key === "comments" ? (
            <TextareaAutosize
              key={`textarea-apartment-${index}`}
              className="area-input"
              aria-label={`${item[authState.language]}-label`}
              minRows={5}
              maxRows={5}
              defaultValue={editApartment.comments}
              placeholder={item[`${authState.language}_label`]}
              ref={refs.current[index]}
            />
          ) : item.type.fieldType === "input" ? (
            <Grid item sm={item.gridSize} key={item.en_label}>
              <Input
                textType={getInputType(item)}
                label={item[`${authState.language}_label`]}
                value={editApartment[item.key]}
                error={errorList[item.key]}
                required={true}
                ref={refs.current[index]}
              />
            </Grid>
          ) : item.type.fieldType === "autocomplete" ? (
            <Grid item sm={item.gridSize} key={item.en_label}>
              {item.key === "city" ? (
                <CityAutocomplete
                  label={item[`${authState.language}_label`]}
                  error={errorList[item.key]}
                  defaultValue={editApartment[item.key]}
                  setState={setCity}
                  ref={refs.current[index]}
                />
              ) : (
                <StreetAutocomplete
                  label={item[`${authState.language}_label`]}
                  error={errorList[item.key]}
                  city={city}
                  defaultValue={editApartment[item.key]}
                  ref={refs.current[index]}
                />
              )}
            </Grid>
          ) : (
            <Grid item sm={item.gridSize} key={item.en_label}>
              <Select
                label={item[`${authState.language}_label`]}
                value={editApartment[item.key]}
                error={errorList[item.key]}
                disabled={false}
                list={getSelectList(item)}
                ref={refs.current[index]}
              />
            </Grid>
          ),
        )}
      </Grid>
      <div className="mt-2">
        <EditButtons onSave={onSubmit} onCancel={() => navigate("/")} />
      </div>
    </>
  );
}
