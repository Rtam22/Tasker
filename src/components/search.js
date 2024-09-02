import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault();
    if (input === "") {
      return;
    }
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input)}`);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input onChange={(e) => setInput(e.target.value)} value={input}></input>
        <button type="submit">S</button>
      </form>
    </div>
  );
};

export default Search;
