import { Grid, TextareaAutosize } from "@mui/material";
import { createRef, Ref, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apartmentFormLabels } from "../../../Assets/Create";
import { AuthContext } from "../../../Contexts/AuthContext";
import { IApartment } from "../../../Data/interfaces/IApartment";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import {
  getFieldsErrorStatus,
  isFormFieldsErrors,
} from "../../../Services/Global";
import Autocomplete from "../../Global/FormComponents/Autocomplete";
import Input from "../../Global/FormComponents/Input";
import Select from "../../Global/FormComponents/Select";
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
    const list = getFieldsErrorStatus(
      apartmentFormLabels,
      refs,
      // valuesSelectLists,
    );

    if (isFormFieldsErrors(list)) {
      setErrorList(list);
    } else {
      setErrorList({});
      return navigate("/");
    }
  };

  return (
    <>
      <Grid container spacing={1.5}>
        {apartmentFormLabels.map((item, index) =>
          item.name === "comments" ? (
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
          ) : item.type === "input" ? (
            <Grid item sm={item.gridSize} key={item.en_label}>
              <Input
                textType={item.textType ?? "text"}
                label={item[`${authState.language}_label`]}
                value={editApartment[item.name]}
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
                defaultValue={editApartment[item.name]}
                isCityAutocomplete={item.name === "city"}
                isStreetAutocomplete={item.name === "street" ? city : ""}
              />
            </Grid>
          ) : (
            <Grid item sm={item.gridSize} key={item.en_label}>
              <Select
                label={item[`${authState.language}_label`]}
                value={editApartment[item.name]}
                error={errorList[item.name] === false ? item.error : ""}
                disabled={false}
                list={item.list ?? []}
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
