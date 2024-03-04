import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import HistoryPage from "./pages/HistoryPage";
import Navbar from "./ui/Navbar";
import Photo from "./types/DataTypes";
import { LRUCache } from "lru-cache";
import useScrollHandler from "./hooks/useScrollHandler";
import useBeforeUnloadHandler from "./hooks/useBeforeUnloadHandler";
import useFetchPhotos from "./hooks/useFetchPhotos";
const cache = new LRUCache<string, Photo[]>({
  max: 150,
});
const clientID = `&client_id=${import.meta.env.VITE_API_URL}`;
const apiUrl = `https://api.unsplash.com/photos?`;
const apiSearchUrl = "https://api.unsplash.com/search/photos?";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [initialFetch, setInitialFetch] = useState(false);

  // custom hook for handling scroll events
  useScrollHandler({ loading, setPage });

  // custom hook to handle beforeunload event
  useBeforeUnloadHandler({ cache });

  // fetch photos hook
  const fetchPhotos = useFetchPhotos(
    setLoading,
    setPhotos,
    loading,
    page,
    query,
    apiUrl,
    apiSearchUrl,
    clientID,
    cache
  );

  useEffect(() => {
    const loadFromCache = async () => {
      try {
        const cachedData = query ? cache.get(query) : cache.get("popular");

        if (cachedData) {
          setPhotos(cachedData);
          console.log(`Loaded from Cache: ${query || "popular"}`);
        } else {
          setPhotos([]);
          await fetchPhotos();
          console.log(`Fetched from API: ${query || "popular"}`);
        }

        setInitialFetch(true);
      } catch (error) {
        console.error("Error loading from cache or fetching from API:", error);
        setInitialFetch(true);
      }
    };

    loadFromCache();
  }, [page, query]);

  useEffect(() => {
    if (initialFetch) {
      fetchPhotos();
    }
  }, [query, page, history, initialFetch]);

  return (
    <BrowserRouter>
      <Navbar setQuery={setQuery} setPage={setPage} />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              photos={photos}
              setQuery={setQuery}
              setHistory={setHistory}
              setPage={setPage}
              initialFetch={initialFetch}
              query={query}
            />
          }
        />
        <Route
          path="/history"
          element={
            <HistoryPage
              history={history}
              photos={photos}
              setQuery={setQuery}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
