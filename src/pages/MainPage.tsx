import PhotoList from "../features/mainPage/PhotoList";
import SearchInput from "../features/mainPage/SearchInput";
import Photo from "../types/DataTypes";
import Loading from "../ui/Loading";

type MainPageTypes = {
  photos: Photo[];
  setQuery: (value: string) => void;
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setPage: (value: number) => void;
  initialFetch: boolean;
};
const MainPage = ({
  photos,
  setQuery,
  setHistory,
  setPage,
  initialFetch,
}: MainPageTypes) => {
  if (!initialFetch) return <Loading />;
  return (
    <main className="section-center">
      <SearchInput
        setQuery={setQuery}
        setHistory={setHistory}
        setPage={setPage}
      />
      {photos.length < 1 ? (
        <p>ფოტოები ვერ მოიძებნა</p>
      ) : (
        <PhotoList photos={photos} />
      )}
    </main>
  );
};

export default MainPage;
