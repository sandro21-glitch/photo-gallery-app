import Photo from "../../types/DataTypes";
import Photos from "../../ui/Photos";

import "./PhotoList.css";
type PhotoListTypes = {
  photos: Photo[];
};
const PhotoList = ({ photos }: PhotoListTypes) => {
  return <Photos photos={photos} />;
};

export default PhotoList;
