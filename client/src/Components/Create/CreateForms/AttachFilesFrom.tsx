import { Grid } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import UploadImages from "../ManageFiles/UploadImages";
import UploadPDF from "../ManageFiles/UploadPDF";
import StepperBtns from "../Stepper/StepperButtons";

interface AttachFilesFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
}
export default function AttachFilesForm({
  setActiveStep,
}: AttachFilesFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [mainImages, setMainImage] = useState<number>(0);
  const [doc, setDoc] = useState<string>("");

  const changeMainImage = (index: number) => {
    setMainImage(index);
  };

  const clickNext = () => {
    setActiveStep(2);
  };

  const clickBack = () => {
    setActiveStep(1);
  };

  const title = "מסמכים ותמונות";
  return (
    <>
      <div className="tenant-form">
        <div className="sub-page-title">
          {title}
          <Grid container className="mt-3">
            <Grid item sm={5} className={"padding-files-btn"}>
              <UploadPDF pdf={doc} setPdf={setDoc} />
              {!doc && (
                <div className="input-error fs-5 mt-2">{"שדה חובה"}</div>
              )}
            </Grid>
            <Grid item sm={7}>
              <UploadImages
                images={images}
                setImages={setImages}
                mainImages={mainImages}
                handleChangeMainImage={changeMainImage}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <StepperBtns next={clickNext} back={clickBack} activeStep={2} />
    </>
  );
}
