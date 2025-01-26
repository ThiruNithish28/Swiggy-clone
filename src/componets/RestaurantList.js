import { CardShimmer } from "./ShimmerUI";
import { Link } from "react-router";
import Card from "./Card";

const RestaurantList = ({ title, restaurant }) => {
  return (
    <section className="container">
      <h2
        className="text-2xl capitalize font-bold p-4 text-[#006666]"
      >
        {title || `Restaurant`}
      </h2>
      {restaurant.length === 0 ? (
        <CardShimmer />
      ) : (
        <div className="restaurant-list-container flex flex-wrap items-center border  gap-4">
          {restaurant.map((res) => (
            <Link to={`/restaurant/${res.info?.id}`} key={res?.info?.id}>
              <Card
                name={res.info?.name}
                imgUrl={res.info?.cloudinaryImageId}
                rating={res.info?.avgRating}
                deliveryTime={res.info?.sla?.slaString}
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default RestaurantList;
