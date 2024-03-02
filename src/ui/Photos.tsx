import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import PhotoItem from "../features/mainPage/PhotoItem";

import Photo from "../types/DataTypes";
import "./Photos.css";
type PhotoProps = {
  photos: Photo[];
};
const Photos = ({ photos }: PhotoProps) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="20px">
        {photos.map((photo, index) => {
          const {
            id,
            likes,
            links: { download },
            urls: { regular },
          } = photo;
          return (
            <PhotoItem
              key={index}
              id={id}
              regularImage={regular}
              fullImage={regular}
              download={download}
              likes={likes}
            />
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default Photos;
