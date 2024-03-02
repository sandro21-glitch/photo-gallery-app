// HistoryItem.tsx
import Button from "./Button";

type HistoryItemProps = {
  historyItem: string;
  setQuery: (value: string) => void;
};

const HistoryItem = ({ historyItem, setQuery }: HistoryItemProps) => {
  return (
    <li className="history-item">
      <Button onClick={() => setQuery(historyItem)}>{historyItem}</Button>
    </li>
  );
};

export default HistoryItem;
