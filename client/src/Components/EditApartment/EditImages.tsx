import { Add, HighlightOff } from "@mui/icons-material";
import { Button, Fab, Grid, IconButton } from "@mui/material";
import { ChangeEvent, useState } from "react";
import useMobieDesign from "../../Hooks/useMobile";
import { useError403 } from "../../Services/Utils/useError403";
import ChangeImagesViewBtn from "../Global/Buttons/ChangeImagesViewBtn";
import EditImagesCarousel from "./EditImagesCarousel";

interface EditImagesProps {
  images: string[];
  changeImages: (images: string[]) => void;
  mainImageIndex: number;
  changeMainImageIndex: (index: number) => void;
  newImages: File[];
  changeNewImages: (files: File[]) => void;
}

export default function EditImages({
  images,
  changeImages,
  mainImageIndex,
  changeMainImageIndex,
  newImages,
  changeNewImages,
}: EditImagesProps) {
  const isMobileScreen = useMobieDesign();
  const [isCarouselView, setIsCarouselView] = useState<boolean>(true);

  const handleChangeFiles = (files: File[]) => {
    changeNewImages(files);
  };
  const removeImage = (image: string) => {
    const removeImages = images.filter((img) => img !== image);
    changeImages(removeImages);
  };
  const removeNewImage = (image: any) => {
    let removeImages = newImages.filter((img) => img !== image);
    changeNewImages(removeImages);
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

  if (images.length === 0 && newImages.length === 0) {
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
      </div>
    );
  }

  const changeImagesView = (
    <div className="mb-2">
      <ChangeImagesViewBtn
        onHandleClickChange={() => {
          setIsCarouselView((prevState) => !prevState);
        }}
        isCarouselView={isCarouselView}
      />
    </div>
  );

  if (isMobileScreen && isCarouselView) {
    return (
      <>
        {changeImagesView}
        <EditImagesCarousel
          databaseImages={images}
          onRemoveDatabaseImage={removeImage}
          newImages={newImages}
          onRemoveNewImage={removeNewImage}
          mainImageIndex={mainImageIndex}
          onChangeMainImage={changeMainImageIndex}
          addNewImage={changeFiles}
        />
      </>
    );
  }

  return (
    <>
      {isMobileScreen && changeImagesView}
      <Grid container className="files-container-edit">
        {images.map((img, index) => (
          <Grid
            item
            sm={4}
            className="padding-img"
            key={`apartment-images-${index}`}
          >
            <div className="relative">
              <img
                onClick={() => changeMainImageIndex(index)}
                src={img}
                alt={`preview-img-${index}`}
                width={"100%"}
                className={
                  index === mainImageIndex ? "user-active-image" : "user-image"
                }
                onError={useError403}
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
            {index === mainImageIndex && (
              <h4 className="active-image-text">תמונה ראשית</h4>
            )}
          </Grid>
        ))}
        {newImages.map((img: File, index: number) => (
          <Grid
            item
            sm={4}
            className="padding-img"
            key={`apartment-new-images-${index}`}
          >
            <div className="relative">
              <img
                onClick={() => changeMainImageIndex(images.length + index)}
                src={readFile(img)}
                alt={`preview-img-${index}`}
                width={"100%"}
                className={
                  images.length + index === mainImageIndex
                    ? "user-active-image"
                    : "user-image"
                }
                onError={useError403}
              />
              <div className="remove-pos">
                <IconButton
                  onClick={() => removeNewImage(img)}
                  size="large"
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <HighlightOff fontSize="large" className="remove-icon" />
                </IconButton>
              </div>
            </div>
            {images.length + index === mainImageIndex && (
              <h4 className="active-image-text">תמונה ראשית</h4>
            )}
          </Grid>
        ))}
      </Grid>
      <Fab
        aria-label={"Add"}
        color={"primary"}
        sx={{
          position: "absolute",
          bottom: 200,
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
