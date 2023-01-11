import { Add, HighlightOff } from "@mui/icons-material";
import { Button, Fab, Grid, IconButton } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

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
  const handleChangeFiles = (files: File[], addFiles?: Boolean) => {
    if (addFiles) {
      setImages(files);
    } else {
      setImages(files);
    }
  };

  const removeImage = (removeImage: any) => {
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

  if (!images || images.length === 0) {
    return (
      <div className="h-100 p-4 pb-5">
        <Button
          variant="contained"
          fullWidth
          className="file-btn"
          component="label"
        >
          <h1>העלאת תמונות</h1>
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

  return (
    <>
      <Grid
        container
        className={isEditDialog ? "files-container-edit" : "files-container"}
      >
        {images &&
          images.map((img: File, index: number) => (
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
                <h4 className="active-image-text">תמונה ראשית</h4>
              )}
            </Grid>
          ))}
      </Grid>

      <Fab
        aria-label={"Add"}
        color={"primary"}
        sx={{
          position: isEditDialog ? "absolute" : "relative",
          bottom: isEditDialog ? 90 : 0,
          right: 30,
        }}
        component="label"
      >
        <Add />
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={changeFiles}
        />
      </Fab>
    </>
  );
}
