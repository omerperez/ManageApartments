import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { forwardRef, Ref, useState } from "react";
import { ISelectMenuItem } from "../../../Data/interfaces/Form.interface";
import FormLayout from "../../../Layout/FormLayout";

interface SelectProps {
  label: string;
  value?: string;
  error?: string;
  disabled: boolean;
  list: ISelectMenuItem[];
  editSelect?: { function: (value: string, key: string) => void; key: string };
}

function SelectLabels(
  { label, value, error, list, disabled, editSelect }: SelectProps,
  ref: Ref<any>,
) {
  const MuiSelect = { backgroundColor: "white", marginTop: 0.05 };

  const [currentValue, setCurrentValue] = useState<string>(value ?? "");

  const handleChange = (event: SelectChangeEvent<any>) => {
    if (editSelect) {
      editSelect.function(event.target.value, editSelect.key);
    }
    setCurrentValue(event.target.value);
  };

  return (
    <FormLayout label={label} error={error}>
      <Select
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        }}
        sx={MuiSelect}
        value={currentValue}
        onChange={handleChange}
        displayEmpty
        className={error ? "bg-white error-border" : "bg-white"}
        fullWidth
        disabled={disabled}
        inputProps={{ "aria-label": "Without label" }}
        inputRef={ref}
      >
        {list.map((item, key) => (
          <MenuItem
            sx={{ direction: "ltr" }}
            value={item.value}
            key={`menu-item-${key}`}
          >
            {item.value ? <em>{item.label}</em> : item.label}
          </MenuItem>
        ))}
      </Select>
    </FormLayout>
  );
}

const forwaredSelect = forwardRef(SelectLabels);
export default forwaredSelect;
