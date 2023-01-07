import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import UploadImages from "../Create/ManageFiles/UploadImages";

interface AttachImagesProps {
  setStep: Dispatch<SetStateAction<number>>;
  setApartmentImages: Dispatch<SetStateAction<File[]>>;
  setMainImageIndex: Dispatch<SetStateAction<number>>;
}
export default function AttachImages({
  setStep,
  setApartmentImages,
  setMainImageIndex,
}: AttachImagesProps) {
  const [images, setImages] = useState<File[]>([]);
  const [mainImages, setMainImage] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const changeMainImage = (index: number) => {
    setMainImage(index);
  };

  const onSubmit = () => {
    if (images.length !== 0) {
      setApartmentImages(images);
      setMainImageIndex(mainImages);
      setStep(2);
    } else {
      setError("שדה חובה");
    }
  };

  const ATTACH_IMAGES_TITLE = "מסמכים ותמונות";
  return (
    <>
      <div className="tenant-form">
        <div className="sub-page-title">
          {ATTACH_IMAGES_TITLE}
          <div className="mt-3">
            <UploadImages
              images={images}
              setImages={setImages}
              mainImages={mainImages}
              handleChangeMainImage={changeMainImage}
              error={error}
            />
          </div>
        </div>
      </div>
      <Button fullWidth variant="contained" onClick={onSubmit}>
        צור דירה
      </Button>
    </>
  );
}
