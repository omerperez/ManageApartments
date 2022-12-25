import { Add } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, Fab, Grid, IconButton } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { getBase64 } from "../../../Services/FileService";

interface UploadImagesProps {
  images: string[] | [];
  setImages: Dispatch<SetStateAction<string[]>>;
  mainImages: number;
  handleChangeMainImage: (index: number) => void;
  isEditDialog?: boolean;
}

export default function UploadImages({
  images,
  setImages,
  mainImages,
  handleChangeMainImage,
  isEditDialog,
}: UploadImagesProps) {
  const handleChangeFiles = (files: File[], addFiles?: Boolean) => {
    let currentFiles: string[] = [];
    if (files && files.length > 0) {
      Array.from(files).forEach((file) =>
        getBase64(file)
          .then((result) => {
            return (currentFiles = [...currentFiles, result]);
          })
          .then((currentFiles) => {
            if (addFiles) {
              setImages([...images, ...currentFiles]);
            } else setImages(currentFiles);
          }),
      );
    }
  };

  const removeImage = (removeImage: any) => {
    let removeImages = images.filter((image) => image !== removeImage);
    setImages(removeImages);
  };

  if (images.length === 0) {
    return (
      <div style={{ maxHeight: 250 }}>
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
            onChange={(e: ChangeEvent<any>) => {
              handleChangeFiles(e.target.files);
            }}
          />
        </Button>
        {images.length === 0 && (
          <div className="input-error fs-5 mt-2">{"שדה חובה"}</div>
        )}
      </div>
    );
  }

  return (
    <>
      <Grid
        container
        className={isEditDialog ? "files-container-edit" : "files-container"}
      >
        {images.map((image: string, index: number) => (
          <Grid item sm={4} className="padding-img">
            <div className="relative">
              <img
                onClick={() => handleChangeMainImage(index)}
                src={image}
                alt={`preview-img-${index}`}
                width={"100%"}
                className={
                  index === mainImages ? "user-active-image" : "user-image"
                }
              />
              <div className="remove-pos">
                <IconButton
                  onClick={() => removeImage(image)}
                  size="large"
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <HighlightOffIcon fontSize="large" className="remove-icon" />
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
          onChange={(e: ChangeEvent<any>) => {
            handleChangeFiles(e.target.files, true);
          }}
        />
      </Fab>
    </>
  );
}
