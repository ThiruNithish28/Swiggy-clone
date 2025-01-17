import { imgBaseURl } from "../constant";
import { MdStar } from "react-icons/md";

const Card = ({ name, imgUrl, rating, deliveryTime }) => {
  return (
    <div className="card-container">
      <div className="img-container">
        <img src={imgBaseURl + imgUrl} alt={`${name}-img`} />
      </div>
      <h3 id="res-name">{name}</h3>
      <div className="extra-info d-flex justify-between">
        <p className="rating d-flex align-center"><span><MdStar/></span>{rating}</p>
        <p>{deliveryTime}</p>
      </div>
    </div>
  );
};
export default Card;
