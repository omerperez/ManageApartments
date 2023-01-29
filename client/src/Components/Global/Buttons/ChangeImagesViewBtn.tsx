import { ViewAgendaRounded, ViewCarousel } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface ChangeImagesViewBtnProps {
  onHandleClickChange: () => void;
  isCarouselView: boolean;
}

export default function ChangeImagesViewBtn({
  onHandleClickChange,
  isCarouselView,
}: ChangeImagesViewBtnProps) {
  return (
    <IconButton className="carousel-icon-btn" onClick={onHandleClickChange}>
      {isCarouselView ? (
        <ViewAgendaRounded className="carousel-btn" />
      ) : (
        <ViewCarousel className="carousel-btn" />
      )}
    </IconButton>
  );
}
