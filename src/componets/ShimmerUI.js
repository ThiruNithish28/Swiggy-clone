export const CardShimmer =()=>{
    return(<div className="shimmer-container d-flex flex-wrap g-1">
        {Array(9).fill("").map(index =>
            <div key={index} className="shimmer-card d-flex flex-column g-1">
                <div className="shimmer-card-img"></div>
                <div className="shimmer-card-txt">
                    <div></div>
                    <div></div>
                </div>
                
            </div>
        )}
    </div>)
}