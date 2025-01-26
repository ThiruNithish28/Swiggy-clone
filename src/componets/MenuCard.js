import { imgBaseURl } from "../constant";
import placeholderImg from "../assets/img/placeholder-img.png";

const MenuCard = ({
  ImgUrl,
  menuName,
  price,
  menuDes,
  rating,
  ratingCount,
}) => {
  return (
    <div className="menu-card-container flex w-[500px] h-60 border border-gray-400 overflow-hidden rounded-xl">
      <div className="menu-card-img-container flex-[1_1_30%] w-full h-full">
        <img
          src={ImgUrl ? imgBaseURl + ImgUrl : placeholderImg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="menu-card-details flex flex-col flex-[1_1_60%]  p-4">
        <h3 className="text-lg font-semibold">{menuName}</h3>
        {price && (
          <h4 className="price text-xl font-medium">
            {(price / 100).toFixed(2)}
          </h4>
        )}
        <p className="menu-description text-gray-600 line-clamp-3">
          {menuDes}
        </p>
        <div className="flex items-center justify-between mt-auto w-full">
          {rating && (
            <h2 className="text-green-500 text-base font-semibold">
              {rating}
              <span className="text-gray-600 text-sm rounded-md">{`(${ratingCount})`}</span>
            </h2>
          )}
          <button className="px-6 py-4 ml-auto bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600">ADD</button>
        </div>
      </div>
    </div>
  );
};
export default MenuCard;
