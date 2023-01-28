import { AddPhotoAlternate, HighlightOff } from "@mui/icons-material";
import { Button, Fab, Grid, IconButton } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import useMobieDesign from "../../../Hooks/useMobile";
import { AddFabBtnMui } from "../../../Layout/Mui/Create";
import ImagesCarousel from "./ImagesCarousel";

interface UploadImagesProps {
  images: File[] | [];
  setImages: Dispatch<SetStateAction<File[]>>;
  mainImages: number;
  handleChangeMainImage: (index: number) => void;
  isEditDialog?: boolean;
  error?: string;
}

export default function UploadImages({
  images,
  setImages,
  mainImages,
  handleChangeMainImage,
  isEditDialog,
  error,
}: UploadImagesProps) {
  const isMobileScreen = useMobieDesign();

  const handleChangeFiles = (files: File[], addFiles?: Boolean) => {
    setImages((images as File[]).concat(files));
  };

  const removeImage = (removeImage: File) => {
    let removeImages = images.filter((image) => image !== removeImage);
    setImages(removeImages);
  };

  const readFile = (image: File) => {
    return URL.createObjectURL(image);
  };

  const changeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let files: File[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i]);
      }
      handleChangeFiles(files);
    }
  };

  // Constans
  const UPLOAD_IMAGES_BTN = "צרף תמונות";
  const MAIN_IMAGE = "תמונה ראשית";

  if (!images || images.length === 0) {
    return (
      <div className="upload-image-btn-position">
        <Button
          variant="contained"
          fullWidth
          className="file-btn"
          component="label"
        >
          <h1>{UPLOAD_IMAGES_BTN}</h1>
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={changeFiles}
          />
        </Button>
        {error && <div className="input-error fs-5 mt-2">{error}</div>}
      </div>
    );
  }

  if (isMobileScreen) {
    return (
      <div className="image-carousel">
        <ImagesCarousel
          removeImage={removeImage}
          addFiles={changeFiles}
          images={images}
          onChangeMainImage={handleChangeMainImage}
          mainImageIndex={mainImages}
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
              onChange={changeFiles}
            />
          </Fab>
        </Grid>
        {images.map((img: File, index: number) => (
          <Grid item sm={4} className="padding-img">
            <div className="relative">
              <img
                onClick={() => handleChangeMainImage(index)}
                src={readFile(img)}
                alt={`preview-img-${index}`}
                width={"100%"}
                className={
                  index === mainImages ? "user-active-image" : "user-image"
                }
              />
              <div className="remove-pos">
                <IconButton
                  onClick={() => removeImage(img)}
                  size="large"
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <HighlightOff fontSize="large" className="remove-icon" />
                </IconButton>
              </div>
            </div>
            {index === mainImages && (
              <h4 className="active-image-text">{MAIN_IMAGE}</h4>
            )}
          </Grid>
        ))}
      </>
    </Grid>
  );
}
