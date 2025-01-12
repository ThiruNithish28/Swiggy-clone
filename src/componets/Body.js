import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import searchIcon from "../assets/svg/search-icon.svg"; // Removed duplicate import
import Card from "./Card"; // Ensure the correct case matches your file
import { CardShimmer } from "./ShimmerUI";
import { imgBaseURl } from "../constant";
import { Link } from "react-router";

const Body = () => {
  const [HomePageConfig, setHomePageConfig] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [isChimmerNeed, setIsChimmerNeed] = useState(false);

  // Function to fetch homepage configuration data
  async function getConfigData() {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=10.787719&lng=79.1384288&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const Data = await response.json();
      setHomePageConfig(Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fetch config data on component mount
  useEffect(() => {
    getConfigData();
  }, []);

  // Function to fetch restaurant search suggestions
  async function getRestaurant(searchText) {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=10.787719&lng=79.1384288&str=${searchText}&trackingId=undefined&includeIMItem=true`
    );
    const data = await response.json();
    setSearchSuggestion(data?.data?.suggestions || []);
  }

  // Search functionality
  function search(searchText) {
    setIsChimmerNeed(true);
    getRestaurant(searchText);
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
          <button className="search-submit-btn" onClick={() => search(searchText)}>
            <img src={searchIcon} alt="searchicon" />
          </button>
        </div>

        {/* Display search suggestions */}
        {searchSuggestion?.length > 0 ? (
          <div className="seach-suggestion-container">
            <div className="filter-option d-flex g-1">
              <button onClick={() => handleFilter("restaurant")}>Restaurant</button>
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
      <section className="container">
        <h2>
          {HomePageConfig?.data?.cards[1]?.card?.card?.header?.title || `Top Restaurant`}
        </h2>
        {Object.keys(HomePageConfig).length === 0 ? (
          <CardShimmer />
        ) : (
          <div className="restaurant-list-container d-flex flex-wrap flex-center g-1">
            {HomePageConfig?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
              (res) => (
                <Link to={`/restaurant/${res.info?.id}`}><Card
                  key={res.info?.id || res.info?.name} // Unique key fix
                  name={res.info?.name}
                  imgUrl={res.info?.cloudinaryImageId}
                  rating={res.info?.avgRating}
                  deliveryTime={res.info?.sla?.slaString}
                />
                </Link>
                
              )
            )}
          </div>
        )}
      </section>

      {/* Restaurant List Section */}
      <section className="container">
        <h2>
          {HomePageConfig?.data?.cards[4]?.card?.card?.header?.title || `Restaurant List`}
        </h2>
        {Object.keys(HomePageConfig).length === 0 ? (
          <CardShimmer />
        ) : (
          <div className="restaurant-list-container d-flex flex-wrap flex-center g-1">
            {HomePageConfig?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
              (res) => (
                <Card
                  key={res.info?.id || res.info?.name} // Unique key fix
                  name={res.info?.name}
                  imgUrl={res.info?.cloudinaryImageId}
                  rating={res.info?.avgRating}
                  deliveryTime={res.info?.sla?.slaString}
                />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Body;
