import { useState } from "react";
import "./search-panel.css";

const SearchPanel = (props) => {
  const [term, setTerm] = useState("");

  const onUpdateSearch = (e) => {
    const termValue = e.target.value;
    setTerm(termValue);
    props.onUpdateSearch(e.target.value);
  };

  return <input type="text" className="form-control search-input" placeholder="Найти сотрудника" onChange={onUpdateSearch} value={term} />;
};

export default SearchPanel;
