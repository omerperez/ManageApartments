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
import CreateFormLayout from "../../Layout/CreateFormLayout";
import { createApartment } from "../../Services/Api/ApartmentApi";
import {
  getApartmentFormObject,
  getInputType,
  getSelectList,
} from "../../Services/FormService";
import { getSubmitFormValues } from "../../Services/Global";
import UploadImages from "../Create/ManageFiles/UploadImages";
import Autocomplete from "../Global/FormComponents/Autocomplete";
import Input from "../Global/FormComponents/Input";
import Select from "../Global/FormComponents/Select";

interface CreateApartmentFormProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setApartmentId: Dispatch<SetStateAction<string>>;
}

export default function CreateApartment({
  setLoading,
  setApartmentId,
}: CreateApartmentFormProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [city, setCity] = useState<string>("");
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(apartmentFormLabels.map(() => createRef()));
  const [apartmentImages, setApartmentImages] = useState<File[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  const onSubmit = () => {
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      apartmentFormLabels,
      refs,
    );
    if (isFormPropper && apartmentImages.length > 0) {
      setLoading(true);
      setErrorList({});
      const values = formValues as { [key: string]: string };
      const newApartment: CreateApartmentDto = {
        ...getApartmentFormObject(values),
        owner: authState.mobile,
        mainImageIndex: mainImageIndex,
      };
      createApartment(newApartment, apartmentImages).then((response) => {
        setApartmentId(response._id ?? "");
        setLoading(false);
      });
    } else {
      if (apartmentImages.length === 0) {
        return setErrorList({
          ...(errorList as IErrosListObject),
          images: "אנא הוסף תמונות",
        });
      }
      setErrorList(errorList as IErrosListObject);
    }
  };

  const APARTMENT_DETAILS_TITLE = "פרטי הדירה";
  return (
    <CreateFormLayout
      title={APARTMENT_DETAILS_TITLE}
      secondPart={
        <UploadImages
          images={apartmentImages}
          setImages={setApartmentImages}
          mainImages={mainImageIndex}
          handleChangeMainImage={setMainImageIndex}
          error={errorList.images}
        />
      }
      saveBtnText={"צור דירה"}
      onSubmit={onSubmit}
      onCancel={() => {}}
    >
      <Grid container spacing={1.5}>
        {apartmentFormLabels.map((item, index) =>
          item.type.fieldType !== "textarea" ? (
            <Grid item sm={item.gridSize} key={item.en_label}>
              {item.type.fieldType === "select" ? (
                <Select
                  label={item[`${authState.language}_label`]}
                  value={""}
                  error={errorList[item.key]}
                  disabled={false}
                  list={getSelectList(item)}
                  ref={refs.current[index]}
                />
              ) : item.type.fieldType === "input" ? (
                <Input
                  textType={getInputType(item)}
                  label={item[`${authState.language}_label`]}
                  value={""}
                  error={errorList[item.key]}
                  required={true}
                  ref={refs.current[index]}
                />
              ) : (
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
              )}
            </Grid>
          ) : (
            <TextareaAutosize
              key={`textarea-apartment-${index}`}
              className="area-input"
              aria-label={`${item[authState.language]}-label`}
              minRows={5}
              defaultValue={""}
              placeholder={item[`${authState.language}_label`]}
              ref={refs.current[index]}
            />
          ),
        )}
      </Grid>
    </CreateFormLayout>
  );
}
