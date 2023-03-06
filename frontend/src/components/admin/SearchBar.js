import React from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";

const SearchBar = ({ placeholder }) => {
  return (
    <>
      <div className="search-bar-card">
        <form className="search-form d-flex ">
          <input
            type="text"
            name="query"
            placeholder={placeholder}
            title="Enter search keyword"
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
