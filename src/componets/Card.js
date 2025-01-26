import { imgBaseURl } from "../constant";
import { MdStar } from "react-icons/md";

const Card = ({ name, imgUrl, rating, deliveryTime }) => {
  return (
    <div className="card-container w-52 h-72 border rounded-xl overflow-hidden ">
      <div className="img-container h-52">
        <img
          src={imgBaseURl + imgUrl}
          alt={`${name}-img`}
          className="w-full h-full"
        />
      </div>
      <div className="px-4">
        <h3 className="font-bold  w-11/12 overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </h3>
        <div className="extra-info flex justify-between items-center">
          <p className="rating flex items-center bg-green-500 font-medium text-white p-1 border rounded-md">
            <span>
              <MdStar />
            </span>
            {rating}
          </p>
          <p>{deliveryTime}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
