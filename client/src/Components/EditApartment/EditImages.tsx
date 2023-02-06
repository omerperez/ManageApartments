import { Add, HighlightOff } from "@mui/icons-material";
import { Button, Fab, Grid, IconButton } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import useMobieDesign from "../../Hooks/useMobile";
import ApartmentMobileImages from "../Global/Mobile/Images/ApartmentMobileImages";
import Image from "../Global/Mobile/Images/Image";

// Constans
const EDIT_IMAGES_TITLE = "עריכת תמונות";

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
  const [apartmentImages, setApartmentImages] = useState<(string | File)[]>([
    ...images,
    ...newImages,
  ]);

  useMemo(() => {
    setApartmentImages([...newImages, ...images]);
  }, [newImages, images]);

  const onClickRemove = (imageIndex: number) => {
    const removeImage = apartmentImages[imageIndex];
    if (typeof removeImage === "string") {
      const filter = images.filter((img) => img !== removeImage);
      changeImages(filter);
    } else {
      const filter = newImages.filter((img) => img !== removeImage);
      changeNewImages(filter);
    }
  };

  const onAddNewImage = (event: ChangeEvent<HTMLInputElement>) => {
    import("../../Services/Utils/formats").then(
      ({ getMultipleFileAsFilesArray }) => {
        const files = getMultipleFileAsFilesArray(event);
        changeNewImages(files);
      },
    );
  };

  if (apartmentImages.length === 0) {
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
            onChange={onAddNewImage}
          />
        </Button>
      </div>
    );
  }

  if (isMobileScreen) {
    return (
      <ApartmentMobileImages
        title={EDIT_IMAGES_TITLE}
        images={apartmentImages}
        mainImageIndex={mainImageIndex}
        onChangeMainImage={changeMainImageIndex}
        onClickRemove={onClickRemove}
        onAddNewImage={onAddNewImage}
      />
    );
  }

  return (
    <>
      <Grid container className="files-container-edit">
        {images.map((img, index) => (
          <Grid
            item
            sm={4}
            className="padding-img"
            key={`apartment-images-${index}`}
          >
            <div className="relative">
              <Image
                onClick={() => changeMainImageIndex(index)}
                src={img}
                alt={`preview-img-${index}`}
                width={"100%"}
                className={
                  index === mainImageIndex ? "user-active-image" : "user-image"
                }
              />
              <div className="remove-pos">
                <IconButton
                  onClick={() => onClickRemove(index)}
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
              <Image
                onClick={() => changeMainImageIndex(images.length + index)}
                src={img}
                alt={`preview-img-${index}`}
                width={"100%"}
                className={
                  images.length + index === mainImageIndex
                    ? "user-active-image"
                    : "user-image"
                }
              />
              <div className="remove-pos">
                <IconButton
                  onClick={() => onClickRemove(images.length + index)}
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
          onChange={onAddNewImage}
        />
      </Fab>
    </>
  );
}
