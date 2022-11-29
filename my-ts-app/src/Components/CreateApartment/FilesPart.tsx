/* eslint-disable no-loop-func */
import { Grid } from "@mui/material";
import { useState } from "react";
import "../../Layout/CSS/Create.css";
import UploadImages from "./Files/UploadImages";
import UploadPDF from "./Files/UploadPDF";

export default function FilesPart() {
  const [images, setImages] = useState<string[]>([]);
  const [doc, setDoc] = useState<string>("");
  const [mainImages, setMainImage] = useState<number>(0);

  const changeMainImage = (index: number) => {
    setMainImage(index);
  };

  console.log(doc);
  return (
    <div className="mt-3">
      <h1>מסמכים ותמונות</h1>
      <Grid container className="mt-3">
        <Grid item sm={3} className={"padding-files-btn"}>
          <UploadPDF pdf={doc} setPdf={setDoc} />
        </Grid>
        <Grid item sm={9}>
          <UploadImages
            images={images}
            setImages={setImages}
            mainImages={mainImages}
            handleChangeMainImage={changeMainImage}
          />
        </Grid>
      </Grid>
    </div>
  );
}
