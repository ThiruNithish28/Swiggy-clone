// this the draft file

// where adding the filter operation in restauratn menu page

// step 1: get the state
const [filteredMenu, setFilteredMenu] = useState([]);
// step 2: add the filter function
function filterTheMenuByCategories(category) {
  const filterd = restaurantMenu.filter(
    (menu) => menu.card?.card?.title === category
  );
  console.log(filterd);
  const menuItems =
    filterd[0].card?.card?.categories || filterd[0].card?.card?.itemCards;
  console.log("menu", menuItems);
  setFilteredMenu(menuItems);
}
// step 3: add the side-nav
<aside className="restaurant-page-side-nav">
  <h3>Filters</h3>
  <ul>
    {menuCategories.map((category, index) => (
      <li key={index} onClick={() => filterTheMenuByCategories(category)}>
        {category}
      </li>
    ))}
  </ul>
</aside>;
// adding style
/* .restaurant-page-side-nav {
    position: sticky;
    flex-shrink: 0;
    width: 200px;
    height: 100vh;
    padding: 10px;
    border-right: 1px solid #ccc;
    background-color: white; /* Optional: ensures it has a background 
    z-index: 1000; /* Ensures it stays above other content 
  } */

    
// ----------------------------------------------------------------
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import searchIcon from "../assets/svg/search-icon.svg";
import searchIcon from "../assets/svg/search-icon.svg";
import Card from "./card";
import { CardShimmer } from "./ShimmerUI";
import { imgBaseURl } from "../constant";

const Body = () => {
  const [HomePageConfig, setHomePageConfig] = useState({});
  const [searchText, setSearchText] = useState(" ");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [isChimmerNeed, setIsChimmerNeed] = useState(false);

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

  useEffect(() => {
    getConfigData();
  }, []);

  async function getRestaurant(searchText) {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/search/suggest?lat=10.787719&lng=79.1384288&str=${searchText}&trackingId=undefined&includeIMItem=true"
    );
    const data = await response.json();
    setSearchSuggestion(data?.data?.suggestions);
  }
  function search(searchText) {
    setIsChimmerNeed(true);
    getRestaurant(searchText);
    setTimeout(() => setIsChimmerNeed(false), 1000);
  }

  function handleFilter(filter) {
    const filteredData = searchSuggestion.filter(
      (res) => res.subCategory.toLowerCase() === filter.toLowerCase()
    );
    setSearchSuggestion(filteredData);
  }

  return (
    <div className="d-flex flex-column g-3 flex-center">
      <div className="container landing-Banner-container d-flex flex-column flex-center">
        <div className="search-bar d-flex flex-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-submit-btn">
            <img
              src={searchIcon}
              alt="searchicon"
              onClick={() => search(searchText)}
            />
          </button>
        </div>
        {searchSuggestion?.length > 0 ? (
          <div className="seach-suggestion-container">
            <div className="filter-option d-flex g-1">
              <button onClick={() => handleFilter("restaurant")}>
                restaurant
              </button>
              <button onClick={() => handleFilter("dish")}>dish</button>
            </div>
            <div className="search-suggestion d-flex flex-wrap g-1">
              {searchSuggestion.map((res) => (
                <div className="search-suggestion-card-container">
                  <img src={imgBaseURl + res.cloudinaryId} />
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
      <section className="container">
        <h2>
          {HomePageConfig?.data?.cards[1]?.card?.card?.header?.title ||
            "Top Restaurant"}
        </h2>
        {Object.keys(HomePageConfig).length === 0 ? (
          <CardShimmer />
        ) : (
          <div className="restaurant-list-container d-flex flex-wrap flex-center g-1">
            {HomePageConfig?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
              (res, index) => (
                <Card
                  key={index}
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
      <section className="container">
        <h2>
          {HomePageConfig?.data?.cards[4]?.card?.card?.header?.title ||
            "Restaurant List"}
        </h2>
        {Object.keys(HomePageConfig).length === 0 ? (
          <CardShimmer />
        ) : (
          <div className="restaurant-list-container d-flex flex-wrap flex-center g-1">
            {HomePageConfig?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
              (res, index) => (
                <Card
                  key={index}
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
