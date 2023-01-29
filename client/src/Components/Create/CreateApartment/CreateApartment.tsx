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
import { useNavigate } from "react-router-dom";
import { apartmentFormLabels } from "../../../Assets/Create";
import { AuthContext } from "../../../Contexts/AuthContext";
import { CreateApartmentDto } from "../../../Data/interfaces/dto/CreateApartment.dto";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import useMobieDesign from "../../../Hooks/useMobile";
import CreateFormLayout from "../../../Layout/CreateFormLayout";
import { getInputType, getSelectList } from "../../../Services/FormService";
import CityAutocomplete from "../../Global/FormComponents/CityAutocomplete";
import Input from "../../Global/FormComponents/Input";
import Select from "../../Global/FormComponents/Select";
import StreetAutocomplete from "../../Global/FormComponents/StreetAutocomplete";
import UploadImages from "./UploadImages";

interface CreateApartmentFormProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setApartmentId: Dispatch<SetStateAction<string>>;
}

// Constans
const APARTMENT_DETAILS_TITLE = "פרטי הדירה";
const CREATE_APARTMENT_BTN = "צור דירה";
const IMAGES_ERROR = "אנא הוסף תמונות";

export default function CreateApartment({
  setLoading,
  setApartmentId,
}: CreateApartmentFormProps) {
  const isMobileDesign = useMobieDesign();
  const { authState } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("");
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const refs: Ref<any> = useRef(apartmentFormLabels.map(() => createRef()));
  const [apartmentImages, setApartmentImages] = useState<File[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onSubmit = async () => {
    const { getSubmitFormValues } = await import("../../../Services/Global");
    const [formValues, errorList, isFormPropper] = getSubmitFormValues(
      apartmentFormLabels,
      refs,
    );
    if (isFormPropper && apartmentImages.length > 0) {
      setLoading(true);
      setErrorList({});
      const values = formValues as { [key: string]: string };
      const { getApartmentFormObject } = await import(
        "../../../Services/FormService"
      );
      const newApartment: CreateApartmentDto = {
        ...getApartmentFormObject(values),
        owner: authState.mobile,
        mainImageIndex: mainImageIndex,
      };
      const { createApartment } = await import(
        "../../../Services/Api/ApartmentApi"
      );
      createApartment(newApartment, apartmentImages).then((response) => {
        setApartmentId(response._id ?? "");
        setLoading(false);
      });
    } else {
      if (apartmentImages.length === 0) {
        return setErrorList({
          ...(errorList as IErrosListObject),
          images: IMAGES_ERROR,
        });
      }
      setErrorList(errorList as IErrosListObject);
    }
  };

  const onCancel = () => {
    return navigate("/");
  };

  return (
    <CreateFormLayout
      ref={scrollRef}
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
      saveBtnText={CREATE_APARTMENT_BTN}
      onSubmit={onSubmit}
      onCancel={onCancel}
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
              ) : item.key === "city" ? (
                <CityAutocomplete
                  label={item[`${authState.language}_label`]}
                  error={errorList[item.key]}
                  defaultValue={""}
                  setState={setCity}
                  ref={refs.current[index]}
                />
              ) : (
                <StreetAutocomplete
                  label={item[`${authState.language}_label`]}
                  error={errorList[item.key]}
                  city={city}
                  defaultValue={""}
                  ref={refs.current[index]}
                />
              )}
            </Grid>
          ) : (
            <TextareaAutosize
              key={`textarea-apartment-${index}`}
              className="area-input"
              aria-label={`${item[authState.language]}-label`}
              minRows={isMobileDesign ? 10 : 5}
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
