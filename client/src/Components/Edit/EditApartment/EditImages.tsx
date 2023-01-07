import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { DialogImagesMui } from "../../../Layout/Mui/Edit";
import ThemeStyleRTL from "../../../Layout/ThemeStyleRTL";
import UploadImages from "../../Create/ManageFiles/UploadImages";

interface EditImagesProps {
  prevImages: File[] | [];
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  mainImageIndex: number;
  setMainImageIndex: Dispatch<SetStateAction<number>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditImages({
  prevImages,
  images,
  setImages,
  mainImageIndex,
  setMainImageIndex,
  open,
  setOpen,
}: EditImagesProps) {
  const [imagesBackup, setImagesBackup] = useState<File[]>(prevImages);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const changeMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  const saveChanges = () => {
    setImagesBackup(images);
    setOpen(false);
  };

  const cancelChanges = () => {
    setImages(imagesBackup);
    setOpen(false);
  };

  const editImagesText = "עריכת תמונות";

  return (
    <>
      <Button className="edit-images-btn" onClick={handleClickOpen}>
        {editImagesText}
      </Button>
      <ThemeStyleRTL>
        <Dialog
          sx={DialogImagesMui}
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {
              <UploadImages
                images={images}
                setImages={setImages}
                mainImages={mainImageIndex}
                handleChangeMainImage={changeMainImage}
                isEditDialog={true}
              />
            }
          </DialogContent>
          <DialogActions disableSpacing={false}>
            <Button
              fullWidth
              variant="contained"
              className="edit-cancel-btn"
              onClick={cancelChanges}
            >
              ביטול שינויים
            </Button>
            <Button
              fullWidth
              variant="contained"
              component="label"
              className="edit-save-btn"
              onClick={saveChanges}
            >
              שמור שינויים
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeStyleRTL>
    </>
  );
}
