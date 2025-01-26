import { v4 as uuidv4 } from "uuid";
export const CardShimmer = () => {
  return (
    <div className="shimmer-container flex flex-wrap gap-4">
      {Array(9)
        .fill("")
        .map((index) => (
          <div
            key={uuidv4()}
            className="shimmer-card flex flex-col gap-4 rounded-xl w-60 aspect-square bg-gray-500 p-4"
          >
            <div className="shimmer-card-img w-52 aspect-square bg-gray-400"></div>
            <div className="shimmer-card-txt space-y-2">
              <div className="h-5 bg-gray-400 w-4/5"></div>
              <div className="h-5 bg-gray-400 w-full"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export const RestaurantMenuCardShimmer = () => {
  return (
    <div className="shimmer-container container flex justify-center flex-wrap gap-4">
      {Array(20)
        .fill("")
        .map((index) => (
          <div
            className="shimmer-card flex  gap-4 rounded-xl w-[500px] h-72 aspect-square bg-gray-500 p-4"
            key={uuidv4()}
          >
            <div
              className="shimmer-card-img flex-[1_1_40%] bg-gray-400"
            ></div>
            <div className="shimmer-card-txt flex-[1_1_60%] space-y-2">
              <div className="h-5 bg-gray-400 w-4/5"></div>
              <div className="h-5 bg-gray-400 w-full"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export const RestaurantDetailShimmer = () => {
  return (
    <div className="restaurnat-details-container container flex justify-between mt-5">
      <div className="shimmer-card-txt space-y-1">
        <div  className="h-5 w-72 bg-gray-400"></div>
        <div className="h-5 w-32 bg-gray-400"></div>
        <div className="h-5 w-20 bg-gray-400"></div>
      </div>
      <div className="shimmer-card-txt space-y-2">
        <div className="h-5 w-20 bg-gray-400"></div>
        <div className="h-5 w-11 bg-gray-400"></div>
      </div>
    </div>
  );
};
