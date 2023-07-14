import styled from "styled-components";
import product_icon from "../img/product_icon.png";
import bookmark_icon from "../img/bookmark_icon.png";
import { Link } from "react-router-dom";

export const DropdownContainer = styled.div`
  width: 200px;
  height: 150px;
  position: absolute;
  left: -126px;
  top: 46px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  .dropdownList {
    flex: 1 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    &:last-of-type {
      border: none;
    }
    .link {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration-line: none;
      font-size: 16px;
      color: black;
    }
  }

  ::after {
    content: "";
    position: absolute;
    top: -18px;
    left: 134px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 18px solid white;
    z-index: 2;
  }
  ::before {
    content: "";
    position: absolute;
    top: -19px;
    left: 133px;
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 19px solid #e6e6e6;
    z-index: 1;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

function Dropdown({ handleDropdown }) {
  return (
    <DropdownContainer>
      <div className="dropdownList">함재형님, 안녕하세요!</div>
      <div className="dropdownList" onClick={handleDropdown}>
        <Link to="/products/list" className="link">
          <img className="icon" src={product_icon} alt="giftIcon" />
          <span>상품리스트 페이지</span>
        </Link>
      </div>
      <div className="dropdownList" onClick={handleDropdown}>
        <Link to="/bookmark" className="link">
          <img className="icon" src={bookmark_icon} alt="bookmarkIcon" />
          <div>북마크 페이지</div>
        </Link>
      </div>
    </DropdownContainer>
  );
}

export default Dropdown;
