import { Button } from "@mui/material";
import Image from "../Image";

// Constans
const REMOVE_IMAGE = "הסרה";

interface ImagesCarouselViewProps {
  images: (string | File)[];
  mainCaruselImageIndex: number;
  onChangeCurrentImage: (index: number) => void;
  mainImageIndex?: number;
  onChangeMainImage?: (index: number) => void;
  handleClickRemove?: (index: number) => void;
}
export default function ImagesCarouselView({
  images,
  mainCaruselImageIndex,
  onChangeCurrentImage,
  onChangeMainImage,
  mainImageIndex,
  handleClickRemove,
}: ImagesCarouselViewProps) {
  const handleChangeMainImage = (index: number) => {
    if (onChangeMainImage) {
      onChangeMainImage(index);
    }
  };

  if (images.length === 0) {
    return null;
  }

  const onImageClick = (index: number) => {
    if (index === mainCaruselImageIndex) {
      return handleChangeMainImage(mainCaruselImageIndex);
    }
    return onChangeCurrentImage(index);
  };

  const getrotateY = (index: number) => {
    const value = ((index - mainCaruselImageIndex) * 360) / images.length;
    if (value < 0) {
      return value + 360;
    }
    return value;
  };

  return (
    <div className="scene">
      <div className="carousel">
        {images.map((img, index) => (
          <div
            className="carousel__cell"
            style={{
              transform: `rotateY(${getrotateY(index)}deg) translateZ(288px)`,
            }}
          >
            <div className={handleClickRemove ? "relative" : ""}>
              <Image
                onClick={() => onImageClick(index)}
                src={img}
                alt={`Current-Img-${mainCaruselImageIndex}`}
                height={"180px"}
                className={`image-carousel${
                  index === mainImageIndex ? "-active" : ""
                }`}
                style={
                  index === mainCaruselImageIndex ? { zIndex: "1000000" } : null
                }
              />
              {index === mainCaruselImageIndex && handleClickRemove ? (
                <div className="remove-image-carousel-pos">
                  <Button
                    onClick={() => {
                      handleClickRemove(mainCaruselImageIndex);
                    }}
                    variant="contained"
                    className="remove-btn-carousel"
                  >
                    {REMOVE_IMAGE}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
