"use client";

import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <div className="back-to-top-container">
        <button
          className="back-to-top"
          onClick={() => window.scrollTo(0, 0)}
          title="Back to top"
        >
          <FaChevronUp size={24} />
        </button>
      </div>
    )
  );
}

export default BackToTop;
