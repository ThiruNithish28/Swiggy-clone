import { useParams } from "react-router";
import { FaLocationDot } from "react-icons/fa6";
import { MdStar } from "react-icons/md";
import BreadCrumbs from "./BreadCrumbs";
import SearchBar from "./SearchBar";
import MenuCard from "./MenuCard";
import {
  RestaurantDetailShimmer,
  RestaurantMenuCardShimmer,
} from "./ShimmerUI";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useScrollStatus from "../utils/useScrollStatus";

const Restaurant = () => {
  const { resId } = useParams();
  console.log(resId);
  const {restaurantDetails, restaurantMenu, menuCategories, allMenu} = useRestaurantMenu(resId); 
  const isScrollUp = useScrollStatus;
 
  // search menu function is INCOMPLETE ?
  async function searchMenu(searchText) {
    const encodedSearchText = encodeURIComponent(searchText); // will make some character valid to url such as spaces, &, ?, =, etc
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl/search?lat=10.787719&lng=79.1384288&restaurantId=${resId}&query=${encodedSearchText}`
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <>{console.log("restaurantDetails : ", restaurantDetails, "restaurant menu: ", restaurantMenu)}

      <BreadCrumbs />
      {/* restaurant details  */}
      {!restaurantDetails?.name ? (
        <RestaurantDetailShimmer />
      ) : (
        <div
          className={`restaurant-details-container container sticky top-0 flex justify-between px-7 py-5 mt-5 bg-white ${
            isScrollUp ? " border-b-2" : "border-none"
          }`}
        >
          <div>
            <h1 className="text-2xl font-bold">{restaurantDetails?.name}</h1>
            <p className="text-red-400">
              {restaurantDetails?.cuisines?.join(",")}
            </p>
            <p className="flex items-center">
              <span>
                <FaLocationDot />
              </span>
              {restaurantDetails?.areaName}
            </p>
          </div>
          <div className="items-end">
            <div className="restaurant-rating flex items-center justify-end gap-2 ">
              <p className="rating flex items-center w-max text-green-500">
                <span>
                  <MdStar />
                </span>
                {restaurantDetails?.avgRating}
              </p>
              <span className="text-gray-500">
                {restaurantDetails?.totalRatingsString}
              </span>
            </div>
            <p>{restaurantDetails?.sla?.slaString}</p> {/* distance */}
            <SearchBar isSmall={true} mainSearch={searchMenu} />
          </div>
        </div>
      )}

      <h2 className="text-2xl font-extrabold m-2 text-center text-[#006666]">
        MENU
      </h2>
      {console.log(restaurantMenu)}

      {restaurantMenu.length === 0 ? (
        <RestaurantMenuCardShimmer />
      ) : (
        <div className="restaurant-menu-lists container flex flex-wrap justify-center gap-4 ">
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
