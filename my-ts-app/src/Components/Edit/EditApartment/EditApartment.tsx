import { Button, Grid, TextareaAutosize } from "@mui/material";
import { Stack } from "@mui/system";
import {
  createRef,
  Ref,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { apartmentFormLabels } from "../../../Assets/Create";
import { AuthContext } from "../../../Contexts/AuthContext";
import { IApartment } from "../../../Data/interfaces/IApartment";
import { IMenuTextItem } from "../../../Data/interfaces/IForm";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import { AuthContextType } from "../../../Data/types/Auth";
import {
  getFieldsErrorStatus,
  isFormFieldsErrors,
} from "../../../Services/Global";
import {
  getAllCities,
  getStreetsByCity,
  numbersList,
} from "../../../Services/HttpService";
import Autocomplete from "../../Global/FormComponents/Autocomplete";
import Input from "../../Global/FormComponents/Input";
import Select from "../../Global/FormComponents/Select";
import EditButtons from "../EditButtons";
import ChangeTenant from "./ChangeTenant";
import EditImages from "./EditImages";

interface ApartmentPartProps {
  editApartment: IApartment;
}

export default function EditApartmentForm({
  editApartment,
}: ApartmentPartProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [cityList, setCityList] = useState<IMenuTextItem[]>([]);
  const [streets, setStreets] = useState<IMenuTextItem[]>([]);
  const [city, setCity] = useState<string>("");
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const navigate = useNavigate();
  const refs: Ref<any> = useRef(apartmentFormLabels.map(() => createRef()));
  const [images, setImages] = useState<string[]>(editApartment.images);
  const [mainImages, setMainImage] = useState<number>(
    editApartment.mainImageIndex,
  );
  const [openEditImages, setOpenEditImages] = useState<boolean>(false);
  const [openEditTenant, setOpenEditTenant] = useState<boolean>(false);

  useEffect(() => {
    getAllCities().then((results) => {
      setCityList(results);
    });
  }, []);

  useMemo(() => {
    if (city) {
      getStreetsByCity(city).then((results) => {
        setStreets(results);
      });
    }
  }, [city]);

  const getCorrectList = (type: string, name: string) => {
    if (type === "select") return numbersList;
    if (name === "city") {
      return cityList;
    }
    return streets;
  };

  const onSubmit = () => {
    const valuesSelectLists = [
      {
        name: "city",
        list: cityList,
      },
      {
        name: "street",
        list: streets,
      },
    ];
    const list = getFieldsErrorStatus(
      apartmentFormLabels,
      refs,
      valuesSelectLists,
    );

    if (isFormFieldsErrors(list)) {
      setErrorList(list);
    } else {
      setErrorList({});
      return navigate("/homepage");
    }
  };

  const title = "עריכת דירה";

  return (
    <div className="edit-form">
      <Grid container spacing={1.5}>
        <Grid item sm={8} className="sub-page-title">
          {title}
        </Grid>
        <Grid item sm={4}>
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <EditImages
              prevImages={editApartment.images}
              images={images}
              setImages={setImages}
              mainImageIndex={mainImages}
              setMainImageIndex={setMainImage}
              open={openEditImages}
              setOpen={setOpenEditImages}
            />
            <ChangeTenant
              editTenantId={editApartment.currentTenantId}
              apartmentId={editApartment.name} //change to id
              open={openEditTenant}
              setOpen={setOpenEditTenant}
            />
          </Stack>
        </Grid>
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
                disabled={false}
                list={getCorrectList("autocomplete", item.name)}
                ref={refs.current[index]}
                setState={setCity}
                defaultValue={editApartment[item.name]}
              />
            </Grid>
          ) : (
            <Grid item sm={item.gridSize} key={item.en_label}>
              <Select
                label={item[`${authState.language}_label`]}
                value={editApartment[item.name]}
                error={errorList[item.name] === false ? item.error : ""}
                disabled={false}
                list={getCorrectList("select", item.name)}
                ref={refs.current[index]}
              />
            </Grid>
          ),
        )}
      </Grid>
      <div className="mt-2">
        <EditButtons onSave={onSubmit} onCancel={() => navigate("/")} />
      </div>
    </div>
  );
}
