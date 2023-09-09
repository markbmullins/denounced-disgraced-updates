import { useState, useEffect } from "react";

const useNavbarColorOnScroll = (threshold = 10) => {
  const [isTransparent, setIsColored] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsColored(false);
      } else {
        setIsColored(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { isTransparent };
};

export default useNavbarColorOnScroll;
