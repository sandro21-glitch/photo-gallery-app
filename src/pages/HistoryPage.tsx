import SearchList from "../features/historyPage/SearchList";
import Photo from "../types/DataTypes";
import Photos from "../ui/Photos";

type HistoryPageTypes = {
  history: string[];
  photos: Photo[];
  setQuery: (value: string) => void;
};

const HistoryPage = ({ history, photos, setQuery }: HistoryPageTypes) => {
  return (
    <section className="section-center">
      <SearchList history={history} setQuery={setQuery} />
      <Photos photos={photos} />
    </section>
  );
};

export default HistoryPage;
