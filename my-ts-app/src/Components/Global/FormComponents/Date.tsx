import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref, useState } from "react";
import { convertDateFormatToDayJS } from "../../../Features/Format";
import FormLayout from "../../../Layout/FormLayout";

interface DateProps {
  cancelLabel: boolean;
  label: string;
  value: string;
  disabled?: boolean;
  errorComment?: string;
  validation?: {
    function: (date: string) => boolean;
    errorComment: ((status: boolean) => string) | string;
  };
}

function Date(
  { cancelLabel, label, value, disabled, validation, errorComment }: DateProps,
  ref: Ref<any>,
) {
  const [date, setDate] = useState<Dayjs | null>(
    value ? convertDateFormatToDayJS(value) : null,
  );

  const [error, setError] = useState<string>(errorComment ?? "");

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);

    const isPropperValue = validation?.function(
      dayjs(newValue).format("DD/MM/YYYY"),
    );
    if (!isPropperValue) {
      if (typeof validation?.errorComment === "string") {
        return setError(validation.errorComment);
      } else {
        if (isPropperValue === false) {
          const currentError = validation?.errorComment(false);
          if (currentError) {
            setError(currentError);
          } else {
            setError("");
          }
        }
      }
    }
  };

  return (
    <FormLayout label={label} error={error}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          readOnly={disabled}
          label={cancelLabel ? "" : label}
          value={date}
          onChange={handleChange}
          renderInput={(params) => {
            return <TextField {...params} />;
          }}
          inputRef={ref}
        />
      </LocalizationProvider>
    </FormLayout>
  );
}

const forwaredDate = forwardRef(Date);
export default forwaredDate;
