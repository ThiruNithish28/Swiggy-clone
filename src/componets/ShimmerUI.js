export const CardShimmer = () => {
  return (
    <div className="shimmer-container d-flex flex-wrap g-1">
      {Array(9)
        .fill("")
        .map((index) => (
          <div key={index} className="shimmer-card d-flex flex-column g-1">
            <div className="shimmer-card-img"></div>
            <div className="shimmer-card-txt">
              <div></div>
              <div></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export const RestaurantMenuCardShimmer = () => {
  return (
    <div className="shimmer-container d-flex flex-center flex-wrap g-1">
    {Array(20).fill("").map((index)=>(
        <div style={{width:"500px", height:"220px"}}className="shimmer-card d-flex g-1" key={index}>
        <div style={{flex: "1 1 40%"}} className="shimmer-card-img"></div>
        <div style={{flex: "1 1 60%"}} className="shimmer-card-txt">
          <div></div>
          <div></div>
        </div>
      </div>
    ))}
    </div>
    
  );
};

export const RestaurantDetailShimmer =()=>{
    return(<div className="restaurnat-details-container d-flex justify-between">
<div className="shimmer-card-txt">
    <div style={{width:"300px"}}></div>
    <div style={{width:"120px"}}></div>
    <div style={{width:"100px"}}></div>
</div>
<div className="shimmer-card-txt">
    <div></div>
    <div></div>
</div>
    </div>)
}