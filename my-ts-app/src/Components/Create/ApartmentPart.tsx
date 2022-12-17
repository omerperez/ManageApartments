import { Grid, TextareaAutosize } from "@mui/material";
import {
  createRef,
  Dispatch,
  Ref,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { apartmentFormLabels } from "../../Assets/Create";
import { AuthContext } from "../../Contexts/AuthContext";
import { PrivateContext } from "../../Contexts/Private";
import { IMenuTextItem } from "../../Data/interfaces/IForm";
import { IErrosListObject } from "../../Data/interfaces/IValidation";
import { AuthContextType } from "../../Data/types/Auth";
import { PrivateContextType } from "../../Data/types/Private";
import {
  getFieldsErrorStatus,
  isFormFieldsErrors,
} from "../../Services/Global";
import {
  getAllCities,
  getStreetsByCity,
  numbersList,
} from "../../Services/HttpService";
import Autocomplete from "../Global/FormComponents/Autocomplete";
import Input from "../Global/FormComponents/Input";
import Select from "../Global/FormComponents/Select";
import StepperBtns from "./StepperBtns";

interface ApartmentPartProps {
  setStep?: Dispatch<SetStateAction<number>>;
}

export default function ApartmentPart({ setStep }: ApartmentPartProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const { privateState, setApartment, changeStepStatus } = useContext(
    PrivateContext,
  ) as PrivateContextType;

  const [cityList, setCityList] = useState<IMenuTextItem[]>([]);
  const [streets, setStreets] = useState<IMenuTextItem[]>([]);
  const [city, setCity] = useState<string>("");
  const [errorList, setErrorList] = useState<IErrosListObject>({});

  useEffect(() => {
    getAllCities().then((results) => {
      setCityList(results);
    });
  }, []);

  const refs: Ref<any> = useRef(apartmentFormLabels.map(() => createRef()));

  useMemo(() => {
    if (city) {
      getStreetsByCity(city).then((results) => {
        setStreets(results);
      });
    }
  }, [city]);

  const getCorrectList = (type: string, name: string) => {
    if (type === "select") return numbersList;
    if (name === "city") return cityList;
    return streets;
  };

  const handleClickNext = () => {
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
      setStep && setStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setErrorList({});
      setStep && setStep((prevActiveStep) => prevActiveStep + 1);
      changeStepStatus("apartment", true);
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
            ) : item.name === "city" ? (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Autocomplete
                  label={item[`${authState.language}_label`]}
                  error={errorList[item.name] === false ? item.error : ""}
                  disabled={false}
                  list={getCorrectList("autocomplete", "city")}
                  ref={refs.current[index]}
                  setState={setCity}
                />
              </Grid>
            ) : item.name === "street" ? (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Autocomplete
                  label={item[`${authState.language}_label`]}
                  error={errorList[item.name] === false ? item.error : ""}
                  disabled={city ? false : true}
                  list={getCorrectList("autocomplete", "street")}
                  ref={refs.current[index]}
                />
              </Grid>
            ) : (
              <Grid item sm={item.gridSize} key={item.en_label}>
                <Select
                  label={item[`${authState.language}_label`]}
                  value={privateState.apartment[item.name]}
                  error={errorList[item.name] === false ? item.error : ""}
                  disabled={false}
                  list={getCorrectList("select", item.name)}
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
