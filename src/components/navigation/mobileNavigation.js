import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./mobileNavigation.css";
const MobileNavigation = () => {
  return (
    <div className="mobileNavigationContainer">
      <button>
        <FontAwesomeIcon icon={faBars} className="burgerButton" />
      </button>
    </div>
  );
};

export default MobileNavigation;
