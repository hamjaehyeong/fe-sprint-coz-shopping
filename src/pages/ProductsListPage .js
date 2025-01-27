import styled from "styled-components";

import all from "../img/all.png";
import product from "../img/product.png";
import category from "../img/category.png";
import exhibition from "../img/exhibition.png";
import brand from "../img/brand.png";
import { useState, useEffect } from "react";

import Item from "../components/Item";

export const ProductListPageContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  padding: 24px 76px 24px 76px;
  font-size: 16px;
  min-height: 694px;
  .filter {
    display: flex;
  }
`;
const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 36px;
  text-decoration: ${(props) => (props.selected ? "underline" : "none")};
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  color: ${(props) => (props.selected ? "#412DD4" : "#000000")};
  &:hover {
    cursor: pointer;
  }
  &:last-of-type {
    margin-right: 0px;
  }

  .filterImg {
    width: 82px;
    height: 82px;
    margin-bottom: 4px;
  }
`;

export const ListContainer = styled.ul`
  display: flex;
  margin-top: 24px;
  margin-bottom: 12px;
  height: auto;
  width: 1128px;
  flex-wrap: wrap;
  & > * {
    margin-right: 24px;
  }

  & > *:nth-child(4n) {
    margin-right: 0px;
  }
`;

function ProductsListPage({
  bookmarkedItemsId,
  setBookmarkedItemsId,
  handleShowModal,
  notifyAdd,
  notifyDelete,
  visibleItemsCount,
  setVisibleItemsCount,
}) {
  const [listData, setListData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  useEffect(() => setVisibleItemsCount(12), [selectedFilter]);

  useEffect(() => {
    fetch("http://cozshopping.codestates-seb.link/api/v1/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((json) => setListData([...json]))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ProductListPageContainer>
      <div className="filter">
        <FilterItem
          onClick={() => setSelectedFilter("")}
          selected={selectedFilter === ""}
        >
          <img className="filterImg" src={all} alt="all" />
          <span>전체</span>
        </FilterItem>
        <FilterItem
          onClick={() => setSelectedFilter("Product")}
          selected={selectedFilter === "Product"}
        >
          <img className="filterImg" src={product} alt="product" />
          <span>상품</span>
        </FilterItem>
        <FilterItem
          onClick={() => setSelectedFilter("Category")}
          selected={selectedFilter === "Category"}
        >
          <img className="filterImg" src={category} alt="category" />
          <span>카테고리</span>
        </FilterItem>
        <FilterItem
          onClick={() => setSelectedFilter("Exhibition")}
          selected={selectedFilter === "Exhibition"}
        >
          <img className="filterImg" src={exhibition} alt="exhibition" />
          <span>기획전</span>
        </FilterItem>
        <FilterItem
          onClick={() => setSelectedFilter("Brand")}
          selected={selectedFilter === "Brand"}
        >
          <img className="filterImg" src={brand} alt="brand" />
          <span>브랜드</span>
        </FilterItem>
      </div>
      <ListContainer>
        {listData
          .filter((item) =>
            selectedFilter ? item.type === selectedFilter : true
          )
          .slice(0, visibleItemsCount)
          .map((item, idx) => (
            <Item
              key={idx}
              item={item}
              bookmarkedItemsId={bookmarkedItemsId}
              setBookmarkedItemsId={setBookmarkedItemsId}
              handleShowModal={handleShowModal}
              notifyAdd={notifyAdd}
              notifyDelete={notifyDelete}
            />
          ))}
      </ListContainer>
    </ProductListPageContainer>
  );
}

export default ProductsListPage;
