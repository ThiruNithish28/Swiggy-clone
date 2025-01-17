import { useEffect, useState } from "react";
import { CardShimmer } from "../componets/ShimmerUI";
import { imgBaseURl } from "../constant";
import useLocation from "../utils/useLocation";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantList from "../componets/RestaurantList";
import searchIcon from "../assets/svg/search-icon.svg";

const Body = () => {
  const { latitude, longitude } = useLocation();
  const isOnline = useOnlineStatus();
  const [HomePageConfig, setHomePageConfig] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [isChimmerNeed, setIsChimmerNeed] = useState(false);

  // Function to fetch homepage configuration data
  async function getConfigData() {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const Data = await response.json();
      setHomePageConfig(Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fetch config data on component mount
  useEffect(() => {
    if (latitude && longitude) {
      getConfigData();
    }
  }, [latitude, longitude]);

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

  // if user offline show the ERROR message
  if (!isOnline) return <h1>Check your internet Connetion</h1>;

  const topRestaurnat =
    HomePageConfig?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants || [];
  const restaurantList =
    HomePageConfig?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants || [];

  return (
    <div className="d-flex flex-column g-3 flex-center">
      {/* Search Bar Section */}
      <div className="container landing-Banner-container d-flex flex-column flex-center">
        <div className="search-bar d-flex flex-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="search-submit-btn"
            onClick={() => search(searchText)}
          >
            <img src={searchIcon} alt="searchicon" />
          </button>
        </div>

        {/* Display search suggestions */}
        {searchSuggestion?.length > 0 ? (
          <div className="seach-suggestion-container">
            <div className="filter-option d-flex g-1">
              <button onClick={() => handleFilter("restaurant")}>
                Restaurant
              </button>
              <button onClick={() => handleFilter("dish")}>Dish</button>
            </div>
            <div className="search-suggestion d-flex flex-wrap g-1">
              {searchSuggestion.map((res) => (
                <div
                  className="search-suggestion-card-container"
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

      {/* Top Restaurants Section */}
      <RestaurantList
        restaurant={topRestaurnat}
        title={HomePageConfig?.data?.cards[1]?.card?.card?.header?.title}
      />

      {/* Restaurant List Section */}
      <RestaurantList
        restaurant={restaurantList}
        title={HomePageConfig?.data?.cards[4]?.card?.card?.header?.title}
      />
    </div>
  );
};

export default Body;
