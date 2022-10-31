import React, {ChangeEvent, FC, useState} from "react";
import "./search-panel.css";

interface SearchPanelProps {
  onUpdateSearch: (term: string) => void
}

const SearchPanel: FC<SearchPanelProps> = ({ onUpdateSearch }) => {
  const [term, setTerm] = useState("");

  const updateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const termValue = e.target.value;
    setTerm(termValue);
    onUpdateSearch(e.target.value);
  };
  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="Найти сотрудника"
      onChange={updateHandler}
      value={term}
    />
  );
};

export default SearchPanel;
