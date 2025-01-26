import { useEffect, useState } from "react";

const Restaurant2 = ({ RestaurantID }) => {
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [menuCategories, setMenuCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchRestaurantData() {
        try {
            const response = await fetch(
                `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.787719&lng=79.1384288&restaurantId=680218`
            );
            const data = await response.json();
            console.log("API Response:", data); // Debugging the API response

            const cards = data?.data?.cards || [];

            // Extract restaurant information
            const restaurantInfoCard = cards.find((card) => card.card?.card?.info);
            const restaurantInfo = restaurantInfoCard?.card?.card?.info || null;
            setRestaurantDetails(restaurantInfo);

            // Extract menu categories
            const groupedCard = cards.find((card) => card.groupedCard)?.groupedCard;
            const menuSections =
                groupedCard?.cardGroupMap?.REGULAR?.cards || [];

            const categories = menuSections
                .filter((section) => section.card?.card?.title)
                .map((section) => section.card.card.title);

            setMenuCategories(categories);
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRestaurantData();
    }, [RestaurantID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar for Menu Categories */}
            <div style={{ width: "200px", padding: "10px", borderRight: "1px solid #ccc" }}>
                <h3>Filters</h3>
                <ul>
                    {menuCategories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
            </div>

            {/* Main Restaurant Info */}
            <div style={{ marginLeft: "220px", padding: "10px" }}>
                {restaurantDetails ? (
                    <>
                        <h1>{restaurantDetails.name}</h1>
                        <p>{restaurantDetails.cuisines?.join(", ")}</p>
                        <p>
                            {restaurantDetails.areaName}, {restaurantDetails.city}
                        </p>
                        <p>
                            Rating: {restaurantDetails.avgRating} (
                            {restaurantDetails.totalRatingsString})
                        </p>
                    </>
                ) : (
                    <p>No restaurant details available.</p>
                )}
            </div>
        </div>
    );
};

export default Restaurant2;
