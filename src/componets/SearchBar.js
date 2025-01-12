import { useState } from "react";
import searchIcon from "../assets/svg/search-icon.svg";
const SearchBar = () => {
  
  return (
    <div className="search-bar d-flex flex-center">
      <input type="text" placeholder="Search..." />
      <button className="search-submit-btn">
        <img src={searchIcon} alt="searchicon" onClick={()=>search()}/>
      </button>
    </div>
  );
};
export default SearchBar;