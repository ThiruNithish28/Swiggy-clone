import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [allMenu, setAllMenu] = useState([]);

  useEffect(() => {
    
    const fetchRestaurantData = async () => {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.787719&lng=79.1384288&restaurantId=${resId}`
      );

      const Data = await response.json();
      const cards = Data?.data?.cards || [];

      //Extract the Restaurant Details
      const restaurantInfoCard = cards.find((card) => card.card?.card?.info);
      const restaurantInfo = restaurantInfoCard?.card?.card?.info;
      setRestaurantDetails(restaurantInfo);

      //Extract the MENU card
      const groupedCard = cards.find((card) => card.groupedCard)?.groupedCard;
      const menuSection = groupedCard?.cardGroupMap?.REGULAR?.cards || [];
      const menuSectionItems = menuSection?.filter(
        (card) => card.card?.card?.itemCards || card.card?.card?.categories
      );

      {
        console.log("menuSectionIems", menuSectionItems);
      }

      setRestaurantMenu(menuSectionItems);
      setAllMenu(menuSectionItems);

      //Extract Categories name
      const categoriesName = menuSection
        .filter((section) => section.card?.card?.title)
        .map((section) => section.card.card.title);
      setMenuCategories(categoriesName);
    };
    if(resId) {
        fetchRestaurantData();
    }
  }, [resId]);

  return {restaurantDetails, restaurantMenu, menuCategories, allMenu}
};

export default useRestaurantMenu;
