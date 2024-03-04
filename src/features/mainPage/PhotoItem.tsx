import { useState } from "react";
import "./PhotoItem.css";
import "react-responsive-modal/styles.css";

import PhotoItemModal from "../photoModal/PhotoItemModal";
type PhotoItemTypes = {
  regularImage: string;
  download: string;
  id: string;
  likes: number;
  fullImage: string;
};
const clientID = '&client_id=2rKpEXvSH5wvKMV3RMSY1UlPlUd4QjftBQw3IBTMmdk';
const PhotoItem = ({
  regularImage,
  download,
  id,
  likes,
  fullImage,
}: PhotoItemTypes) => {
  const [totalDownloads, setTotalDownloads] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
    setOpen(true);
    getDownloadStats();
  };

  const getDownloadStats = async () => {
    setIsLoading(true);
    try {
      const statsResponse = await fetch(
        `https://api.unsplash.com/photos/${id}/statistics?${clientID}`
      );
      const stats = await statsResponse.json();
      setTotalDownloads(stats.downloads.total);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <li className="photo-list__item" onClick={onOpenModal}>
        <img
          src={regularImage}
          alt="image"
          loading="lazy"
          className="photo-item__image"
        />
      </li>
      <PhotoItemModal
        open={open}
        setOpen={setOpen}
        download={download}
        fullImage={fullImage}
        likes={likes}
        totalDownloads={totalDownloads}
        isLoading={isLoading}
      />
    </>
  );
};

export default PhotoItem;
