import { useEffect, useState } from "react";

import { imgBaseURl } from "../constant";
import useLocation from "../utils/useLocation";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantList from "../componets/RestaurantList";

import useFetch from "../utils/usefetch";
import { useLocationContext } from "../utils/locationContext";

const Body = () => {

  const {location} = useLocationContext(); //get location detail from the context
  const isOnline = useOnlineStatus();
  
  // Function to fetch homepage configuration data
  const urlForRestaurants = (location?.lon && location?.lat )? `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.lon}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING` : null;

  const {data, error, isLoading}= useFetch(urlForRestaurants); 
  const HomePageConfig = data;

  
  const topRestaurnat =
  HomePageConfig?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  ?.restaurants || [];
  const restaurantList =
  HomePageConfig?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  ?.restaurants || [];
  
  if(isLoading) return <h1>Loading....</h1>;

  // error 
  if(error) return <h1 className="text-red-600 font-bold">Error {error}</h1>

  // if user offline show the ERROR message
  if (!isOnline) return <h1>Check your internet Connetion</h1>;

  return (
    <div className="container flex flex-col gap-3  items-center">
      {console.log("body render")}
      {console.log(HomePageConfig)}
      
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
