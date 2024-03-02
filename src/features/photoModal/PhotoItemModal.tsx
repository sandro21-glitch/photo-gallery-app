import { Modal } from "react-responsive-modal";
import "./PhotoItemModal.css";
import PhotoModalContent from "./PhotoModalContent";

type ModalTypes = {
  open: boolean;
  setOpen: (value: boolean) => void;
  download: string;
  likes: number;
  totalDownloads: number | null;
  fullImage: string;
  isLoading: boolean;
};

const PhotoItemModal = ({
  open,
  setOpen,
  download,
  likes,
  totalDownloads,
  fullImage,
  isLoading,
}: ModalTypes) => {
  const onCloseModal = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      closeOnOverlayClick
      showCloseIcon
      center
    >
      <PhotoModalContent
        download={download}
        likes={likes}
        totalDownloads={totalDownloads}
        fullImage={fullImage}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default PhotoItemModal;
