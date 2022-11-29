import { Button, Grid, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { getBase64 } from "../../../Services/FileService";
import { Add } from "@mui/icons-material";

interface UploadImagesProps {
  images: string[] | [];
  setImages: Dispatch<SetStateAction<string[]>>;
  mainImages: number;
  handleChangeMainImage: (index: number) => void;
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export default function UploadImages({
  images,
  setImages,
  mainImages,
  handleChangeMainImage,
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
      </div>
    );
  }

  return (
    <div>
      <Grid container className="files-container">
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
      <IconButton component="label">
        <Add className="add-btn" />
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={(e: ChangeEvent<any>) => {
            handleChangeFiles(e.target.files, true);
          }}
        />
      </IconButton>
    </div>
  );
}
