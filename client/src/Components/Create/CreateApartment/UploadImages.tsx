import { AddPhotoAlternate, HighlightOff } from "@mui/icons-material";
import { Fab, Grid, IconButton } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import useMobieDesign from "../../../Hooks/useMobile";
import UploadImagesBtn from "../../Global/Buttons/UploadImagesBtn";
import ApartmentMobileImages from "../../Global/Mobile/Images/ApartmentMobileImages";
import Image from "../../Global/Mobile/Images/Image";

// Constans
const UPLOAD_IMAGES_BTN = "לחץ עבור העלאת תמונות";
const MAIN_IMAGE = "תמונה ראשית";

interface UploadImagesProps {
  images: File[] | [];
  setImages: Dispatch<SetStateAction<File[]>>;
  mainImageIndex: number;
  handleChangeMainImage: (index: number) => void;
  isEditDialog?: boolean;
  error?: string;
}

export default function UploadImages({
  images,
  setImages,
  mainImageIndex,
  handleChangeMainImage,
  isEditDialog,
  error,
}: UploadImagesProps) {
  const isMobileScreen = useMobieDesign();

  const handleChangeFiles = (files: File[]) => {
    setImages((images as File[]).concat(files));
  };

  const onClickRemoveImage = (index: number) => {
    const removeImage = images[index];
    const filter = images.filter((img) => img !== removeImage);
    setImages(filter);
  };

  const onAddNewImage = (event: ChangeEvent<HTMLInputElement>) => {
    import("../../../Services/Utils/formats").then(
      ({ getMultipleFileAsFilesArray }) => {
        const files = getMultipleFileAsFilesArray(event);
        handleChangeFiles(files);
      },
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className="upload-image-btn-position">
        <UploadImagesBtn
          text={UPLOAD_IMAGES_BTN}
          accept="image/*"
          onChange={onAddNewImage}
        />
        {error && <div className="input-error fs-5 mt-2">{error}</div>}
      </div>
    );
  }

  if (isMobileScreen) {
    return (
      <div className="image-carousel">
        <ApartmentMobileImages
          images={images}
          onClickRemove={onClickRemoveImage}
          mainImageIndex={mainImageIndex}
          onChangeMainImage={handleChangeMainImage}
          onAddNewImage={onAddNewImage}
        />
      </div>
    );
  }

  return (
    <Grid
      container
      className={isEditDialog ? "files-container-edit" : "files-container"}
    >
      <>
        <Grid item xs={12} className="padding-img">
          <Fab
            aria-label={"Add"}
            color={"primary"}
            className="add-images-btn"
            // sx={AddFabBtnMui(isMobileScreen, isEditDialog)}
            component="label"
          >
            <AddPhotoAlternate fontSize="large" />
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onAddNewImage}
            />
          </Fab>
        </Grid>
        {images.map((img: File, index: number) => (
          <Grid item sm={4} className="padding-img" key={`img-${img.text}`}>
            <div className="relative">
              <Image
                onClick={() => handleChangeMainImage(index)}
                src={img}
                alt={`preview-img-${index}`}
                width={"100%"}
                className={
                  index === mainImageIndex ? "user-active-image" : "user-image"
                }
              />
              <div className="remove-pos">
                <IconButton
                  onClick={() => onClickRemoveImage(index)}
                  size="large"
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <HighlightOff fontSize="large" className="remove-icon" />
                </IconButton>
              </div>
            </div>
            {index === mainImageIndex && (
              <h4 className="active-image-text">{MAIN_IMAGE}</h4>
            )}
          </Grid>
        ))}
      </>
    </Grid>
  );
}
