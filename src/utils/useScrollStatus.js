import { useEffect, useState } from "react";

const useScrollStatus = () => {
  const [isScrollUp, setIsScrollUp] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 0) {
        setIsScrollUp(true);
      } else {
        setIsScrollUp(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return isScrollUp;
};

export default useScrollStatus;