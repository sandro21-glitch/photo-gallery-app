import { useEffect } from "react";

const useBeforeUnloadHandler = () => {
  const handleBeforeUnload = () => {
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return handleBeforeUnload;
};

export default useBeforeUnloadHandler;
