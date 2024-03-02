import HistoryItem from "./HistoryItem";
import "./SearchList.css";

type SearchListTypes = {
  history: string[];
  setQuery: (value: string) => void;
};

const SearchList = ({ history, setQuery }: SearchListTypes) => {
  const uniqueHistory = [...new Set(history)];
  const isHistoryEmpty = uniqueHistory.length < 1;

  return (
    <ul className="search-list">
      {isHistoryEmpty ? (
        <p>საძიებო სიტყვები არ არის</p>
      ) : (
        uniqueHistory.map((historyItem, index) => {
          return (
            <HistoryItem
              key={index}
              historyItem={historyItem}
              setQuery={setQuery}
            />
          );
        })
      )}
    </ul>
  );
};

export default SearchList;
