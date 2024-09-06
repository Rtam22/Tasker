import Search from "../search";
import "./searchModal.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const SearchModal = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const searchRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !searchRef.current.contains(event.target)
    ) {
      setShowModal(false);
    }
  };

  const handleClick = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        ref={searchRef}
        onClick={handleClick}
        className="searchIconContainer"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-lg" />
      </button>
      <div
        ref={modalRef}
        className={`searchModal ${showModal ? "" : "hidden"}`}
      >
        <Search />
      </div>
    </>
  );
};

export default SearchModal;
