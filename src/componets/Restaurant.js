import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useParams } from "react-router";

const Restaurant = () => {

    const {resId}=useParams();
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [menu, setMenu] = useState([]);
{console.log(resId)}
  async function getRestaurant() {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.787719&lng=79.1384288&restaurantId=${resId}`
    );
{console.log(      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.787719&lng=79.1384288&restaurantId=${resId}`)}
    const Data = await response.json();
    const cards = Data?.data?.cards || [];
    // Extract the data
    const restaurantInfoCard = cards.find((card) => card.card?.card?.info);
    const restaurantInfo = restaurantInfoCard?.card?.card?.info;
    setRestaurantDetails(restaurantInfo);
    // extract filte
    const groupedCard = cards.find((card) => card.groupedCard)?.groupedCard;
    const menuSection = groupedCard?.cardGroupMap?.REGULAR?.cards || [];
    const menuSectionItems = menuSection?.filter(
      (card) => card.card?.card?.itemCards || card.card?.card?.categories
    );
    setRestaurantMenu(menuSectionItems);
    // extract categories
    const categoriesName = menuSection
      .filter((section) => section.card?.card?.title)
      .map((section) => section.card.card.title);
    setMenuCategories(categoriesName);
  }
  useEffect(() => {
    getRestaurant();
  }, []);
  return (
    <>
      <div>
        <h1>{restaurantDetails?.name}</h1>
      </div>
      <div style={{ display: "flex" }}>
        {console.log(restaurantMenu)}
        {/* Sidebar for Menu Categories */}
        <div
          style={{
            width: "200px",
            padding: "10px",
            borderRight: "1px solid #ccc",
          }}
        >
          <h3>Filters</h3>
          <ul>
            {menuCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>

        <div>
          {restaurantMenu?.map((card) => {
            return card?.card?.card?.itemCards?.map((menu) => (
              <MenuCard menuName={menu?.card?.info?.name} />
            ));
          })}
        </div>
      </div>
    </>
  );
};

export default Restaurant;

/// look the api where already have categories obj seperate and normal menu obj seperate 