import { CardShimmer } from "./ShimmerUI";
import searchIcon from "../assets/svg/search-icon.svg";

const searchSuggestion = () => {
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [isChimmerNeed, setIsChimmerNeed] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Function to fetch restaurant search suggestions
  async function getSearchedRestaurant(searchText) {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=10.787719&lng=79.1384288&str=${searchText}&trackingId=undefined&includeIMItem=true`
    );
    const data = await response.json();
    setSearchSuggestion(data?.data?.suggestions || []);
  }

  // Search functionality
  function search(searchText) {
    setIsChimmerNeed(true);
    getSearchedRestaurant(searchText);
    setTimeout(() => setIsChimmerNeed(false), 1000);
  }

  // Handle filtering search suggestions
  function handleFilter(filter) {
    const filteredData = searchSuggestion.filter(
      (res) => res.subCategory.toLowerCase() === filter.toLowerCase()
    );
    setSearchSuggestion(filteredData);
  }

  return (
    <div className="flex flex-col ">
      <div className="search-bar flex justify-center items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="search-submit-btn w-11 p-2 border"
          onClick={() => search(searchText)}
        >
          <img src={searchIcon} alt="searchicon" className="w-full" />
        </button>
      </div>

      {/* Display search suggestions */}
      {searchSuggestion?.length > 0 ? (
        <div className="seach-suggestion-container container border">
          <div className="filter-option flex gap-4">
            <button onClick={() => handleFilter("restaurant")}>
              Restaurant
            </button>
            <button onClick={() => handleFilter("dish")}>Dish</button>
          </div>
          <div className="search-suggestion flex flex-wrap gap-4">
            {searchSuggestion.map((res) => (
              <div
                className="search-suggestion-card-container w-56"
                key={res.id || `${res.text}-${res.subCategory}`} // Unique key fix
              >
                <img src={imgBaseURl + res.cloudinaryId} alt={res.text} />
                <div>
                  <h3>{res.text}</h3>
                  <p>{res.subCategory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        isChimmerNeed && <CardShimmer />
      )}
    </div>
  );
};
