import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  return (
    <>
      <div className="search-bar-card">
        <form className="search-form d-flex " onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            placeholder={placeholder}
            title="Enter search keyword"
            value={searchText}
            onChange={handleChange}
          />
          <button type="submit" title="Search">
            <FaSearch />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
