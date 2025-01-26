import { useState } from "react";
import { searchLocationUrl } from "../constant";
import { Link, useNavigate } from "react-router";
import Body from "./Body";
import useFetch from "../utils/usefetch";
import { useLocationContext } from "../utils/locationContext";
import useDebounce from "../utils/useDebounce";

const Home = () => {
  const { setLocation } = useLocationContext(); // get the setter function from the location context
  const navigate = useNavigate(); // for navigation

  //Navigate to restaurant page
  const handleLocationSelect = (lat, lon) => {
    console.log(lon , lat);
    setLocation({ lat, lon });
    navigate("/restaurants");
  };
  
  const [inputText, setInputText] = useState();
  const debouncedInput = useDebounce(inputText, 500);
  const searchUrl = debouncedInput ? `${searchLocationUrl}q=${debouncedInput}&format=json`: null;

  const { data : suggestion, error } = useFetch(searchUrl);

  return (
    <div>
      <input
        type="text"
        name="location"
        value={inputText}
        placeholder="Enter the location"
        onChange={(e) => setInputText(e.target.value)}
      />

      {error && <h2 className="text-red-600 font-bold">{error}</h2>}

      {/*suggestion  */}
      {suggestion?.length > 0 && (
        <div className="p-4 border">
          <h2 className="text-2xl text-gray-500 uppercase">
            Search suggestion
          </h2>
          <div className="flex flex-col">
            {suggestion?.map((loc, index) => (
              <div key={index} onClick={()=> handleLocationSelect(loc.lat, loc.lon)}>
                {loc?.display_name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
