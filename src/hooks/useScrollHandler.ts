import { useEffect } from "react";

interface ScrollHandlerProps {
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const useScrollHandler = ({ loading, setPage }: ScrollHandlerProps) => {
  const handleScroll = () => {
    if (
      !loading &&
      window.scrollY !== undefined &&
      window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, setPage]);
};

export default useScrollHandler;
