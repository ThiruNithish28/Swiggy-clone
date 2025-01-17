import { CardShimmer } from "./ShimmerUI";
import { Link } from "react-router";
import Card from "./Card";

const RestaurantList = ({ title, restaurant }) => {
  return (
    <section className="container">
      <h2>{title || `Restaurant`}</h2>
      {restaurant.length === 0 ? (
        <CardShimmer />
      ) : (
        <div className="restaurant-list-container d-flex flex-wrap flex-center g-1">
          {restaurant.map((res) => (
            <Link to={`/restaurant/${res.info?.id}`} key={res?.info?.id}>
              <Card
                key={res.info?.id} // Unique key fix
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
