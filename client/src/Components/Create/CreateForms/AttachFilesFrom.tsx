import { Grid } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { IAttachFileForm } from "../../../Data/interfaces/Form.interface";
import { IErrosListObject } from "../../../Data/interfaces/IValidation";
import UploadImages from "../ManageFiles/UploadImages";
import UploadPDF from "../ManageFiles/UploadPDF";
import StepperBtns from "../Stepper/StepperButtons";

interface AttachFilesFormProps {
  files: IAttachFileForm | null;
  setFiles: Dispatch<SetStateAction<IAttachFileForm | null>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
}
export default function AttachFilesForm({
  files,
  setFiles,
  setActiveStep,
}: AttachFilesFormProps) {
  // const [images, setImages] = useState<string[]>(files?.images ?? []);
  const [images, setImages] = useState<File[]>(files?.images ?? []);
  const [mainImages, setMainImage] = useState<number>(
    files?.mainImageIndex ?? 0,
  );
  const [doc, setDoc] = useState<File | null>(files?.agreement ?? null);
  const [error, setError] = useState<IErrosListObject>({});

  const setFilesObject = () => {
    setFiles({
      mainImageIndex: mainImages,
      images: images,
      agreement: doc,
      // currentAgreement: doc,
    });
  };

  const changeMainImage = (index: number) => {
    setMainImage(index);
  };

  const clickNext = () => {
    let currentErrorList: IErrosListObject = {};
    if (doc && images.length !== 0) {
      setFilesObject();
      setActiveStep(3);
    } else {
      if (!doc) currentErrorList.doc = "שדה חובה";
      if (images.length === 0) currentErrorList.images = "שדה חובה";
    }
    setError(currentErrorList);
  };

  const clickBack = () => {
    setFilesObject();
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
              {<div className="input-error fs-5 mt-2">{error.doc}</div>}
            </Grid>
            <Grid item sm={7}>
              <UploadImages
                images={images}
                setImages={setImages}
                mainImages={mainImages}
                handleChangeMainImage={changeMainImage}
                error={error.images}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <StepperBtns next={clickNext} back={clickBack} activeStep={2} />
    </>
  );
}
