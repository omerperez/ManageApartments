import { Grid } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { apartmentFormLabels, fieldType } from "../../Assets/Create";
import Input from "../../Components/Global/FormComponents/Input";
import Select from "../../Components/Global/FormComponents/Select";
import { AuthContext } from "../../Contexts/AuthContext";
import { PrivateContext } from "../../Contexts/Private";
import { IApartment } from "../../Data/interfaces/IApartment";
import useForm from "../../Hooks/useForm";
import {
  getAllCities,
  getStreetsByCity,
  numbersList,
} from "../../Services/HttpService";
import AutocompleteInput from "../Global/FormComponents/Autocomplete";

interface ApartmentPartProps {
  editApartment?: IApartment;
}
interface listItem {
  label: any;
  value: any;
}
export default function ApartmentPart({ editApartment }: ApartmentPartProps) {
  const { state } = useContext(AuthContext);
  const [apartmentValues, onChange, onSelectChange] = useForm();
  const { privateState, privateDispatch } = useContext(PrivateContext);
  const [sel, setSel] = useState<listItem[] | null>(null);
  const [streets, setStreets] = useState<listItem[] | null>(null);

  useMemo(() => {
    if (apartmentValues.city) {
      const fetchData = async () => {
        const streetsList = await getStreetsByCity(apartmentValues.city);
        setStreets(streetsList);
      };
      fetchData();
    }
  }, [apartmentValues.city]);

  useEffect(() => {
    const getCities = async () => {
      const cities = await getAllCities();
      setSel(cities);
    };
    getCities();
  }, []);

  useMemo(() => {
    let details = editApartment ?? privateState.apartment;
    Object.keys(apartmentValues).map((key) => {
      if (apartmentValues[key] !== "") {
        return (details = {
          ...details,
          [key]: apartmentValues[key],
        });
      }
      return "";
    });
    privateDispatch({ type: "setApartment", apartment: details });
  }, [apartmentValues]);

  const showCorrectFieldType = (item: fieldType) => {
    if (item.type === "autocomplete") {
      return (
        <AutocompleteInput
          label={item[`${state.language}_label`]}
          cancelLabel={false}
          onChange={onChange}
          name={item.name}
          disabled={
            item.name === "street" &&
            !Object.keys(apartmentValues).includes("city")
          }
          value={
            apartmentValues[item.name] ?? privateState.apartment[item.name]
          }
          list={item.name === "street" ? streets ?? [] : sel ?? []}
        />
      );
    } else if (item.type === "select") {
      return (
        <Select
          list={numbersList}
          label={item[`${state.language}_label`]}
          cancelLabel={false}
          onChange={onSelectChange}
          name={item.name}
          value={
            apartmentValues[item.name] ?? privateState.apartment[item.name]
          }
        />
      );
    }
    return (
      <Input
        cancelLabel={false}
        label={item[`${state.language}_label`]}
        name={item.name}
        value={apartmentValues[item.name] ?? privateState.apartment[item.name]}
        onChange={onChange}
        required={true}
        className="bg-white"
        type={item.type}
      />
    );
  };

  return (
    <div>
      <div className="sub-page-title">פרטי הדירה</div>
      <Grid container spacing={2}>
        {apartmentFormLabels.map((item) => (
          <Grid item sm={item.gridSize} key={item.en_label}>
            {showCorrectFieldType(item)}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
