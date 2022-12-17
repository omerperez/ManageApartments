/* eslint-disable no-loop-func */
import { Grid } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import "../../Layout/CSS/Create.css";
import UploadImages from "./Files/UploadImages";
import UploadPDF from "./Files/UploadPDF";
import StepperBtns from "./StepperBtns";

interface FilesPartProps {
  setStep?: Dispatch<SetStateAction<number>>;
}

export default function FilesPart({ setStep }: FilesPartProps) {
  const [images, setImages] = useState<string[]>([]);
  const [mainImages, setMainImage] = useState<number>(0);
  const [doc, setDoc] = useState<string>("");

  const changeMainImage = (index: number) => {
    setMainImage(index);
  };

  const clickNext = () => {
    setStep && setStep((prevActiveStep) => prevActiveStep + 1);
  };

  const clickBack = () => {
    setStep && setStep((prevActiveStep) => prevActiveStep - 1);
  };

  const title = "מסמכים ותמונות";
  return (
    <>
      <div style={{ height: "80%" }}>
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
      <StepperBtns next={clickNext} back={clickBack} />
    </>
  );
}
