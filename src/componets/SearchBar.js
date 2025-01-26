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
    <div className="flex">
      <input
        type="text"
        value={searchText}
        placeholder="Search..."
        onChange={(e)=>setSearchText(e.target.value)}
        className={isDisplay ?"block":"hidden" }
      />

      <button
        className="search-submit-btn w-9 h-9 p-1"
      >
        <img
          src={searchIcon}
          alt="searchicon"
          className="w-full h-full"
          onClick={() => search()}
        />
      </button>
    </div>
  ) : (
    <div className="search-bar flex justify-center items-center">
      <input type="text" placeholder="Search..." />
      <button className="search-submit-btn">
        <img src={searchIcon} alt="searchicon" onClick={() => search()} />
      </button>
    </div>
  );
};
export default SearchBar;
