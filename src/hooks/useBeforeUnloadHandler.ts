import { useEffect } from "react";
import { LRUCache } from "lru-cache";

interface BeforeUnloadHandlerProps {
  cache: LRUCache<string, any>;
}

const useBeforeUnloadHandler = ({ cache }: BeforeUnloadHandlerProps) => {
  const handleBeforeUnload = () => {
    cache.clear();
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
