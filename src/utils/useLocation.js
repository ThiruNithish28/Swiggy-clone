import { useEffect, useState } from "react";
const useLocation = () => {
  const [location, setLocation] = useState({ Latitude: null, Longitude: null});

  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("there is some error", error);
        }
      );
    }
    getLocation();
    console.log("useHook","long", location.longitude , "lat", location.latitude);
  }, []);

  return location;
};
export default useLocation;
