import styled from "styled-components"
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import logo from '../img/logo.png';
import hamburgerButton from '../img/hamburger_button.png';

import Dropdown from "./Dropdown";

export const HeaderContainer = styled.header`
position: sticky;
display:flex;
justify-content:space-between;
align-items:center;
height:80px;
padding-left:76px;
padding-right:76px;
box-shadow: 0 8px 8px 0px rgba(0, 0, 0, 0.1);
background-color:white;
z-index: 10;
.leftSection{
    display:flex;
    flex-direction:row;
    align-items:center;
    font-weight:700;
}
.logo_img{
    width:55px;
    height:30px;
    margin-right:12px;
}
.hamburger_img{
    width:34px;
    height:24px;
    &:hover{
    cursor: pointer;
}
}
.rightSection{
    position:relative;
}
`

function Header() {

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    });

    const handleDropdown = (event) => {
        event.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    return (
        <HeaderContainer>
            <div className="leftSection">
                <Link to="/"><img className="logo_img" src={logo} alt="logo" /></Link>
                <h1>COZ Shopping</h1>
            </div>
            <div className="rightSection">
                <img className="hamburger_img" src={hamburgerButton} alt="menu button" onClick={handleDropdown} />
                {showDropdown && <div ref={dropdownRef}><Dropdown handleDropdown={handleDropdown}/></div>}
            </div>
        </HeaderContainer>
    );
}

export default Header;
