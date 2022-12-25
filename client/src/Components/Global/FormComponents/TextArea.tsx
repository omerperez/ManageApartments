import { TextareaAutosize } from "@mui/material";
import { ChangeEvent, Dispatch, forwardRef, Ref, SetStateAction } from "react";
import FormLayout from "../../../Layout/FormLayout";

interface TextAreaProps {
  label?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
function TextArea(
  { label, value, setValue }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <FormLayout label={label}>
      <TextareaAutosize
        className="area-input"
        aria-label={`${label}-label`}
        minRows={3}
        placeholder={label}
        onChange={handleChange}
        value={value}
        ref={ref}
      />
    </FormLayout>
  );
}

const TextAreaInputRef = forwardRef(TextArea);

export default TextAreaInputRef;
