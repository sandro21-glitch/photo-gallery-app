import "./PhotoModalContent.css";
import { BiSolidLike } from "react-icons/bi";
import { ImDownload } from "react-icons/im";
import { GrView } from "react-icons/gr";
import { GoDesktopDownload } from "react-icons/go";
import LoadingContent from "./LoadingContent";
type ModalContentProps = {
  download: string;
  likes: number;
  totalDownloads: number | null;
  fullImage: string;
  isLoading: boolean;
};

const PhotoModalContent = ({
  download,
  likes,
  totalDownloads,
  fullImage,
  isLoading,
}: ModalContentProps) => {
  return (
    <article className="modal-content__container">
      <img src={fullImage} loading="lazy" alt="full image" />
      {isLoading ? (
        <LoadingContent />
      ) : (
        <div className="modal-content__list">
          <div>
            <div className="modal-content__item">
              <BiSolidLike />
              {likes}
            </div>
            <div className="modal-content__item">
              <ImDownload /> {totalDownloads}
            </div>
            <div className="modal-content__item">
              <GrView /> --
            </div>
          </div>
          <div className="modal-content__item">
            <a href={download} target="_blank">
              ჩამოტვირთეთ
              <GoDesktopDownload />
            </a>
          </div>
        </div>
      )}
    </article>
  );
};

export default PhotoModalContent;
