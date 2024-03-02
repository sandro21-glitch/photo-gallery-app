// SearchInput.js
import React, { ChangeEvent, useEffect, useState } from "react";
import "./SearchInput.css";

type SearchInputTypes = {
  setQuery: (value: string) => void;
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setPage: (value: number) => void;
  query: string;
};

const SearchInput = ({
  setQuery,
  setHistory,
  setPage,
  query,
}: SearchInputTypes) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query === "" ? "" : query);
  }, [query]);

  const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setLocalQuery(inputValue);

    if (inputValue === "") {
      setQuery("");
      setPage(1);
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setHistory((prevHistory) => [...prevHistory, inputValue]);
      setQuery(inputValue);
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId, setHistory]);

  return (
    <div className="search-container">
      <label htmlFor="search">ძებნა</label>
      <input
        type="text"
        id="search"
        className="search-input"
        placeholder="მოძებნეთ მაღალი რეზოლუციის სურათები"
        onChange={handleSetQuery}
        value={localQuery}
      />
    </div>
  );
};

export default SearchInput;
