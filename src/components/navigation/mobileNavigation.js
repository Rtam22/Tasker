import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./mobileNavigation.css";
import { useEffect, useRef, useState } from "react";
import NavigationBar from "./navigationBar";
const MobileNavigation = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const modalRef = useRef(null);
  const handleClick = () => {
    setShowNavigation(!showNavigation);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowNavigation(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mobileNavigationContainer">
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faBars} className="burgerButton" />
      </button>
      <div
        ref={modalRef}
        className={`mobileNavigationBar ${showNavigation ? "" : "hide"}`}
      >
        <NavigationBar onClick={handleClick} />
      </div>
    </div>
  );
};

export default MobileNavigation;
