import { Grid, TextareaAutosize } from "@mui/material";
import { useContext } from "react";
import { apartmentFormLabels } from "../Assets/Create";
import EditImages from "../Components/EditApartment/EditImages";
import CityAutocomplete from "../Components/Global/FormComponents/CityAutocomplete";
import Input from "../Components/Global/FormComponents/Input";
import Select from "../Components/Global/FormComponents/Select";
import StreetAutocomplete from "../Components/Global/FormComponents/StreetAutocomplete";
import { AuthContext } from "../Contexts/AuthContext";
import { EditApartmentDto } from "../Data/interfaces/dto/EditApartment.dto";
import { IErrosListObject } from "../Data/interfaces/IValidation";
import { AuthContextType } from "../Data/types/Auth";
import { useEditApartmentData } from "../Hooks/useMetaData";
import CreateFormLayout from "../Layout/CreateFormLayout";
import "../Layout/CSS/EditApartment.css";
import Loading from "../Layout/Loading";
import { getInputType, getSelectList } from "../Services/FormService";

// Constans
const APARTMENT_EDIT_TITLE = "עריכת דירה";

export default function EditApartment() {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const { editData, functions } = useEditApartmentData();

  const onSubmit = async () => {
    const { getSubmitFormValues } = await import("../Services/Global");
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      apartmentFormLabels,
      editData.editFormRefs,
    );
    if (isFormPropper) {
      setLoading(true);
      functions.changeErrors({});
      const values = formValues as { [key: string]: string };
      if (editData.apartment) {
        const { getApartmentFormObject } = await import(
          "../Services/FormService"
        );
        const newApartment = {
          id: editData.apartment.id,
          owner: authState.mobile,
          images: editData.apartment?.images,
          mainImageIndex: editData.apartment?.mainImageIndex,
          ...getApartmentFormObject(values),
        } as EditApartmentDto;
        const { updateApartment } = await import(
          "../Services/Api/ApartmentApi"
        );
        updateApartment(newApartment, editData.newImages).then((response) => {
          functions.navigateToApartmentPage(response._id);
          setLoading(false);
        });
      }
    } else {
      functions.changeErrors(errorList as IErrosListObject);
    }
  };

  if (editData.loading || !editData.apartment) {
    return <Loading text="טוען נתונים" />;
  }

  return (
    <div className="create-form-layout">
      <CreateFormLayout
        title={APARTMENT_EDIT_TITLE}
        secondPart={
          <EditImages
            images={editData.apartment.images}
            changeImages={functions.changeImages}
            mainImageIndex={editData.apartment.mainImageIndex}
            changeMainImageIndex={functions.changeMainImageIndex}
            newImages={editData.newImages}
            changeNewImages={functions.changeNewImages}
          />
        }
        onSubmit={onSubmit}
        onCancel={functions.onCancel}
      >
        <Grid container spacing={1.5}>
          {apartmentFormLabels.map((item, index) =>
            item.type.fieldType !== "textarea" ? (
              <Grid
                item
                xs={item.gridSize >= 4 ? 12 : 6}
                sm={item.gridSize}
                key={item.en_label}
              >
                {item.type.fieldType === "select" ? (
                  <Select
                    label={item.he_label}
                    value={functions.getDefaultValue(item.key)}
                    error={editData.errorList[item.key]}
                    disabled={false}
                    list={getSelectList(item)}
                    ref={editData.editFormRefs.current[index]}
                  />
                ) : item.type.fieldType === "input" ? (
                  <Input
                    textType={getInputType(item)}
                    label={item.he_label}
                    value={functions.getDefaultValue(item.key)}
                    error={editData.errorList[item.key]}
                    required={true}
                    ref={editData.editFormRefs.current[index]}
                  />
                ) : item.key === "city" ? (
                  <CityAutocomplete
                    label={item.he_label}
                    error={editData.errorList[item.key]}
                    defaultValue={functions.getDefaultValue(item.key)}
                    setState={functions.setCity}
                    ref={editData.editFormRefs.current[index]}
                  />
                ) : (
                  <StreetAutocomplete
                    label={item.he_label}
                    error={editData.errorList[item.key]}
                    city={editData.city}
                    defaultValue={functions.getDefaultValue(item.key)}
                    ref={editData.editFormRefs.current[index]}
                  />
                )}
              </Grid>
            ) : (
              <TextareaAutosize
                key={`textarea-apartment-${index}`}
                className="area-input"
                aria-label={`${item.he_label}-label`}
                minRows={5}
                defaultValue={functions.getDefaultValue(item.key)}
                placeholder={item.he_label}
                ref={editData.editFormRefs.current[index]}
              />
            ),
          )}
        </Grid>
      </CreateFormLayout>
    </div>
  );
}
