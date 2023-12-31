import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Status from "../Status/Status";
import Priority from "../Priority/Priority";
import ByNames from "../ByNames/ByNames";
import "./Header.css";

function Header() {
  // Load initial values from localStorage or use default values
  const initialSelected = localStorage.getItem('selected') || 'Status';
  const initialSecondSelected = localStorage.getItem('secondSelected') || 'Priority';

  const [selected, setSelected] = useState(initialSelected);
  const [secondSelected, secondSetSelected] = useState(initialSecondSelected);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Save selections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selected', selected);
  }, [selected]);

  useEffect(() => {
    localStorage.setItem('secondSelected', secondSelected);
  }, [secondSelected]);

  const handleChange = (e) => {
    setSelected(e.target.value);
    setIsDropdownOpen(false);
  }

  const secondHandleChange = (e) => {
    secondSetSelected(e.target.value);
    setIsDropdownOpen(false);
  }

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="main">
      <button
        className={`dropdownButton ${isDropdownOpen ? 'open' : ''}`}
        onClick={handleDropdownClick}
      >
        <FontAwesomeIcon className="HeaderIconFirst" icon={faSliders} /> Display
        <FontAwesomeIcon className="HeaderIconSecond" icon={faAngleDown} />
      </button>
      <div className={`HeaderGrouping ${isDropdownOpen ? 'visible' : ''}`}>
        <div>
          <p className="firstOption">Grouping</p>
          <select value={selected} onChange={(e) => handleChange(e)}>
            <option>Status</option>
            <option>User</option>
            <option>Priority</option>
          </select>
        </div>
        <div className="secondOption">
          <p className="firstOption">Ordering</p>
          <select className="SecondOptionBar" value={secondSelected} onChange={(e) => secondHandleChange(e)}>
            <option>Priority</option>
            <option>Title</option>
          </select>
        </div>
      </div>
      {selected === 'Status' && secondSelected === 'Priority' && <Status sorting={"PriorityWise"} />}
      {selected === 'Status' && secondSelected === 'Title' && <Status sorting={"TitleWise"} />}
      {selected === 'Priority' && secondSelected === 'Priority' && <Priority sorting={'PriorityWise'} />}
      {selected === 'Priority' && secondSelected === 'Title' && <Priority sorting={'TitleWise'} />}
      {selected === 'User' && secondSelected === 'Priority' && <ByNames sorting={'PriorityWise'} />}
      {selected === 'User' && secondSelected === 'Title' && <ByNames sorting={'TitleWise'} />}
    </div>
  );
}

export default Header;
