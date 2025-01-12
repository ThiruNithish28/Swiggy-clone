const MenuCard =({ImgUrl, menuName, price, menuDes})=>{
    return(<div className="menu-card-container">
        <div>
            <img src={ImgUrl} alt=""/>
        </div>
        <div>
            <h2>{menuName}</h2>
            <h3>{price}</h3>
            <p>{menuDes}</p>
        </div>
    </div>)
}
export default MenuCard;