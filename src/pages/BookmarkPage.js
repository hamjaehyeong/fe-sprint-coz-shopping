import styled from "styled-components"

import all from "../img/all.png"
import product from "../img/product.png"
import category from "../img/category.png"
import exhibition from "../img/exhibition.png"
import brand from "../img/brand.png"
import { useState, useEffect } from "react"

import Item from "../components/Item"

export const BookmarkPageContainer = styled.div`

background-color:white;
display:flex;
flex-direction:column;
align-items:center;
margin-top:80px;
padding: 24px 76px 24px 76px;

font-size:16px;
.filter{
    display:flex;
}

`
const FilterItem = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-right:36px;
    text-decoration: ${props => props.selected ? 'underline' : 'none'};
    &:hover{
    cursor: pointer;
}
    &:last-of-type{
        margin-right:0px;
    }

.filterImg{
    width:82px;
    height:82px;
    margin-bottom:4px;
}
`
export const ListContainer = styled.ul`
display:flex;
margin-top:12px;
margin-bottom:12px;
height:auto;
width:1128px;
flex-wrap: wrap;
& > *{
    margin-right: 24px;
  }

& > *:nth-child(4n) {
    margin-right: 0px;
  }
`

function BookmarkPage({bookmarkedItemsId, setBookmarkedItemsId, handleShowModal, notifyAdd, notifyDelete, visibleItemsCount, setVisibleItemsCount}) {
    const [listData, setListData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');

    useEffect(()=>setVisibleItemsCount(12),[selectedFilter])

    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    useEffect(() => {
        // listData가 업데이트되었을 때,
        // bookmarkedItemsId에 해당하는 아이템들을 찾아 bookmarkedItems 상태를 업데이트합니다.
        const newBookmarkedItems = listData.filter(item => bookmarkedItemsId.includes(item.id));
        setBookmarkedItems(newBookmarkedItems);
      }, [listData, bookmarkedItemsId]);

    useEffect(() =>{
        fetch('http://cozshopping.codestates-seb.link/api/v1/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(json => setListData([...json]))
            .catch(error => console.error(error))}
    ,[])



    return (
        <BookmarkPageContainer>
            <div className="filter">
            <FilterItem onClick={()=>setSelectedFilter('')} selected={selectedFilter === ''} ><img className="filterImg"src={all} alt="all"/><span>전체</span></FilterItem>
                <FilterItem onClick={()=>setSelectedFilter('Product')} selected={selectedFilter === 'Product'}><img className="filterImg"src={product} alt="product"/><span>상품</span></FilterItem>
                <FilterItem onClick={()=>setSelectedFilter('Category')} selected={selectedFilter === 'Category'}><img className="filterImg"src={category} alt="category"/><span>카테고리</span></FilterItem>
                <FilterItem onClick={()=>setSelectedFilter('Exhibition')} selected={selectedFilter === 'Exhibition'}><img className="filterImg"src={exhibition} alt="exhibition"/><span>기획전</span></FilterItem>
                <FilterItem onClick={()=>setSelectedFilter('Brand')} selected={selectedFilter === 'Brand'}><img className="filterImg"src={brand} alt="brand"/><span>브랜드</span></FilterItem>
            </div>
            <ListContainer>
            {bookmarkedItems.filter(item=> selectedFilter? item.type===selectedFilter : true)
            .slice(0, visibleItemsCount).map((item,idx)=>
                    <Item 
                    key={idx} 
                    item={item} 
                    bookmarkedItemsId={bookmarkedItemsId} 
                    setBookmarkedItemsId={setBookmarkedItemsId}
                    handleShowModal={handleShowModal}
                    notifyAdd={notifyAdd} 
                    notifyDelete={notifyDelete}
                    />)}
            </ListContainer>
        </BookmarkPageContainer>
    );
  }
  
  export default BookmarkPage;
  