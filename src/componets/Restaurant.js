import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useParams } from "react-router";
import { FaLocationDot } from "react-icons/fa6";
import { MdStar } from "react-icons/md";
import SearchBar from "./SearchBar";
import {
  RestaurantDetailShimmer,
  RestaurantMenuCardShimmer,
} from "./ShimmerUI";

const Restaurant = () => {
  const { resId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  let allMenu = [];
  const [menuCategories, setMenuCategories] = useState([]);

  async function getRestaurant() {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.787719&lng=79.1384288&restaurantId=${resId}`
    );

    const Data = await response.json();
    const cards = Data?.data?.cards || [];
    // Extract the restaurant data
    const restaurantInfoCard = cards.find((card) => card.card?.card?.info);
    const restaurantInfo = restaurantInfoCard?.card?.card?.info;
    setRestaurantDetails(restaurantInfo);

    // extract menu card
    const groupedCard = cards.find((card) => card.groupedCard)?.groupedCard;
    const menuSection = groupedCard?.cardGroupMap?.REGULAR?.cards || [];
    const menuSectionItems = menuSection?.filter(
      (card) => card.card?.card?.itemCards || card.card?.card?.categories
    );
    {
      console.log("menuSectionIems", menuSectionItems);
    }
    setRestaurantMenu(menuSectionItems);
    allMenu = menuSectionItems; // store the all menu in varaible

    // extract categories
    const categoriesName = menuSection
      .filter((section) => section.card?.card?.title)
      .map((section) => section.card.card.title);
    setMenuCategories(categoriesName);
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  async function searchMenu(searchText) {
    const encodedSearchText = encodeURIComponent(searchText); // will make some character valid to url such as spaces, &, ?, =, etc
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl/search?lat=10.787719&lng=79.1384288&restaurantId=218889&query=${encodedSearchText}`
    );
    console.log(
      "url",
      "https://www.swiggy.com/dapi/menu/pl/search?lat=10.787719&lng=79.1384288&restaurantId=218889&query=" +
        searchText
    );
    const data = await response.json();
    console.log(data);
  }
  return (
    <>
      {/* restaurant details  */}
      {Object.keys(restaurantDetails).length === 0 ? (
        <RestaurantDetailShimmer />
      ) : (
        <div
          style={{ padding: "5px 15px", marginTop:"20px" }}
          className=" restaurant-details-container sticky d-flex justify-between"
        >
          <div>
            <h1>{restaurantDetails?.name}</h1>
            <p style={{color:"red"}}>{restaurantDetails?.cuisines?.join(",")}</p>
            <p className="d-flex align-center">
              <span>
                <FaLocationDot />
              </span>
              {restaurantDetails?.areaName}
            </p>
          </div>
          <div style={{ justifyItems: "flex-end" }}>
            <div className="restaurant-rating d-flex align-center g-1">
              <p
                style={{
                  width: "max-content",
                }}
                className="rating d-flex align-center"
              >
                <span>
                  <MdStar />
                </span>
                {restaurantDetails?.avgRating}
              </p>
              <span>{restaurantDetails?.totalRatingsString}</span>
            </div>
            <p>{restaurantDetails?.sla?.slaString}</p> {/* distance */}
            <SearchBar isSmall={true} mainSearch={searchMenu} />
          </div>
        </div>
      )}

      {console.log(restaurantMenu)}

      {restaurantMenu.length === 0 ? (
        <RestaurantMenuCardShimmer />
      ) : (
        <div className="restaurant-menu-lists d-flex flex-wrap flex-center g-1">
          {restaurantMenu?.map((card) => {
            return card?.card?.card?.itemCards?.map((menu) => (
              <MenuCard
                menuName={menu?.card?.info?.name}
                key={menu?.card?.info?.id}
                ImgUrl={menu?.card?.info?.imageId}
                price={menu?.card?.info?.price}
                menuDes={menu?.card?.info?.description}
                rating={menu?.card?.info?.ratings?.aggregatedRating?.rating}
                ratingCount={
                  menu?.card?.info?.ratings?.aggregatedRating?.ratingCountV2
                }
              />
            ));
          })}
        </div>
      )}
    </>
  );
};

export default Restaurant;
