// useFetchPhotos.tsx
import { LRUCache } from "lru-cache";
import Photo from "../types/DataTypes";

const useFetchPhotos = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>,
  loading: boolean,
  page: number,
  query: string,
  apiUrl: string,
  apiSearchUrl: string,
  clientID: string,
  cache: LRUCache<string, Photo[]>
) => {
  const fetchPhotos = async () => {
    if (loading) return;

    setLoading(true);

    let url;
    const perPage = 20;
    const urlPage = `${page}`;
    const urlQuery = query ? `&query=${query}` : "";
    const urlOrder = "&order_by=popular";

    if (query && query !== "") {
      url = `${apiSearchUrl}${urlQuery}&per_page=${perPage}&page=${urlPage}${clientID}`;
    } else {
      url = `${apiUrl}${urlOrder}&per_page=${perPage}${urlPage}${clientID}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      setPhotos((prevPhotos) => {
        if (query && page === 1) {
          const newPhotos = data.results;
          cache.set(query, newPhotos);
          return newPhotos;
        } else if (query) {
          const newPhotos = [...prevPhotos, ...data.results];
          cache.set(query, newPhotos);
          return newPhotos;
        } else {
          const newPhotos = data.slice(0, perPage);
          cache.set("popular", newPhotos);
          return newPhotos;
        }
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return fetchPhotos;
};

export default useFetchPhotos;
