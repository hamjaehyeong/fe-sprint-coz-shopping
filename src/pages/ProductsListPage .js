import styled from "styled-components"

import all from "../img/all.png"
import product from "../img/product.png"
import category from "../img/category.png"
import exhibition from "../img/exhibition.png"
import brand from "../img/brand.png"
import { useState, useEffect } from "react"

import Item from "../components/Item"

export const ProductListPageContainer = styled.div`

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
.filterItem{
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-right:36px;
    &:hover{
    cursor: pointer;
}
    &:last-of-type{
        margin-right:0px;
    }
}
.filterImg{
    width:82px;
    height:82px;
    margin-bottom:4px;
}
`
export const ListContainer = styled.ul`
display:flex;
justify-content:space-between;
margin-top:12px;
margin-bottom:12px;
height:auto;
width:1128px;
flex-wrap: wrap;
`

function ProductsListPage({bookmarkedItemsId, setBookmarkedItemsId, handleShowModal, notifyAdd, notifyDelete, visibleItemsCount}) {
    const [listData, setListData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');

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
    useEffect(()=>console.log(listData),[listData])



    return (
        <ProductListPageContainer>
            <div className="filter">
                <div className="filterItem" onClick={()=>setSelectedFilter('')}><img className="filterImg"src={all} alt="all"/><span>전체</span></div>
                <div className="filterItem" onClick={()=>setSelectedFilter('Product')}><img className="filterImg"src={product} alt="product"/><span>상품</span></div>
                <div className="filterItem" onClick={()=>setSelectedFilter('Category')}><img className="filterImg"src={category} alt="category"/><span>카테고리</span></div>
                <div className="filterItem" onClick={()=>setSelectedFilter('Exhibition')}><img className="filterImg"src={exhibition} alt="exhibition"/><span>기획전</span></div>
                <div className="filterItem" onClick={()=>setSelectedFilter('Brand')}><img className="filterImg"src={brand} alt="brand"/><span>브랜드</span></div>
            </div>
            <ListContainer>
            {listData.filter(item=> selectedFilter? item.type===selectedFilter : true)
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
        </ProductListPageContainer>
    );
  }
  
  export default ProductsListPage;
  