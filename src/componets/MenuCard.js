import { imgBaseURl } from "../constant";
import placeholderImg from '../assets/img/placeholder-img.png';

const MenuCard =({ImgUrl, menuName, price, menuDes, rating, ratingCount})=>{
    return(<div className="menu-card-container d-flex">
        <div className="menu-card-img-container">
            <img src={ImgUrl ?imgBaseURl+ImgUrl : placeholderImg} alt=""/>
        </div>
        <div className="menu-card-details d-flex flex-column">
            <h3>{menuName}</h3>
            {price && <h4 className="price">{(price/100).toFixed(2)}</h4>}
            <p className="menu-description">{menuDes}</p>
            <div>
                {rating && <h2 style={{color:"green"}}>{rating}<span style={{
                    color:"grey",
                }}>{`(${ratingCount})`}</span></h2>}
                <button>ADD</button>
            </div>
            
        </div>
    </div>)
}
export default MenuCard;