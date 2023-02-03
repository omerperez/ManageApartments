import { useError403 } from "../../../../Services/Utils/useError403";

interface ImageProps {
  src: string | File;
  alt: string;
  width?: string | number;
  className?: string;
  onClick?: () => void;
  height?: string | number;
  style?: any;
}

export default function Image({
  src,
  alt,
  width,
  className,
  onClick,
  height,
  style,
}: ImageProps) {
  const readFile = (image: string | File) => {
    if (typeof image !== "string") {
      return URL.createObjectURL(image);
    }
    return image;
  };

  return (
    <img
      src={readFile(src)}
      alt={alt}
      onClick={onClick}
      width={width}
      height={height}
      className={className}
      onError={useError403}
      style={style}
    />
  );
}
