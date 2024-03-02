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

const clientID = `&client_id=${import.meta.env.VITE_API_URL}`;
const apiUrl = `https://api.unsplash.com/photos?`;
const apiSearchUrl = "https://api.unsplash.com/search/photos?";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [initialFetch, setInitialFetch] = useState(false);

  useEffect(() => {
    const cachedData = localStorage.getItem(query);

    const loadFromLocalStorage = () => {
      if (cachedData) {
        setPhotos(JSON.parse(cachedData));
      } else {
        fetchPhotos();
      }
    };

    if (page === 1) {
      loadFromLocalStorage();
    } else {
      fetchPhotos();
    }

    setInitialFetch(true);
  }, [page, query]);

  const fetchPhotos = async () => {
    if (loading) return;
    setLoading(true);
    let url;
    const perPage = 20;
    const urlPage = `${page}`;
    const urlQuery = `&query=${query}`;
    const urlOrder = "&order_by=popular";

    if (query && query !== "") {
      url = `${apiSearchUrl}?${urlPage}${urlQuery}${urlOrder}&per_page=${perPage}${clientID}`;
    } else {
      url = `${apiUrl}?${urlPage}${urlOrder}${clientID}&per_page=${perPage}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setPhotos((prevPhotos) => {
        if (query && page === 1) {
          const newPhotos = data.results;
          // save data to local cache
          localStorage.setItem(query, JSON.stringify(newPhotos));
          return newPhotos;
        } else if (query) {
          const newPhotos = [...prevPhotos, ...data.results];
          // save data to local cache
          localStorage.setItem(query, JSON.stringify(newPhotos));
          return newPhotos;
        } else {
          const newPhotos = [...prevPhotos, ...data];
          localStorage.setItem(query, JSON.stringify(newPhotos));
          return newPhotos;
        }
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loading &&
        window.scrollY !== undefined &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  useEffect(() => {
    if (initialFetch) {
      setPage(1);
      fetchPhotos();
    }
  }, [query, page, history, initialFetch]);

  const handleBeforeUnload = () => {
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
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
