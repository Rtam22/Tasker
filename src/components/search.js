import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Search for task..."
        ></input>
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-lg" />
        </button>
      </form>
    </div>
  );
};

export default Search;
