import React from "react";

import "./RoundedImage.css";

interface Image {
  src: string;
  alt: string;
  width?: string;
}

const RoundedImage: React.FC<Image> = ({ src, alt, width }) => {
  return <img className={`rounded_image ${width}`} src={src} alt={alt} />;
};

export default RoundedImage;
