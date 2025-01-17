import { useState } from "react";
import searchIcon from "../assets/svg/search-icon.svg";

const SearchBar = ({ isSmall , mainSearch}) => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [searchText, setSearchText] = useState("");

  function search(){
    setIsDisplay(cur => !cur);
    mainSearch(searchText);
  }

  return isSmall ? (
    <div className="d-flex">
      <input
        type="text"
        value={searchText}
        placeholder="Search..."
        onChange={(e)=>setSearchText(e.target.value)}
        style={{ display: isDisplay ? "block" : "none" }}
      />

      <button
        className="search-submit-btn"
        style={{ width: "40px", height: "34px" }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={searchIcon}
          alt="searchicon"
          onClick={() => search()}
        />
      </button>
    </div>
  ) : (
    <div className="search-bar d-flex flex-center">
      <input type="text" placeholder="Search..." />
      <button className="search-submit-btn">
        <img src={searchIcon} alt="searchicon" onClick={() => search()} />
      </button>
    </div>
  );
};
export default SearchBar;
