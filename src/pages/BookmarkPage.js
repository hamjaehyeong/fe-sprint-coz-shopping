import styled from "styled-components"

import all from "../img/all.png"
import product from "../img/product.png"
import category from "../img/category.png"
import exhibition from "../img/exhibition.png"
import brand from "../img/brand.png"

export const BookmarkPageContainer = styled.div`

background-color:white;
display:flex;
flex-direction:column;
align-items:center;
padding: 24px 76px 24px 76px;
height:694px;
font-size:16px;
.filter{
    display:flex;
}
.filterItem{
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-right:36px;
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


function BookmarkPage() {
    return (
        <BookmarkPageContainer>
            <div className="filter">
                <div className="filterItem"><img className="filterImg"src={all}/><span>전체</span></div>
                <div className="filterItem"><img className="filterImg"src={product}/><span>상품</span></div>
                <div className="filterItem"><img className="filterImg"src={category}/><span>카테고리</span></div>
                <div className="filterItem"><img className="filterImg"src={exhibition}/><span>기획전</span></div>
                <div className="filterItem"><img className="filterImg"src={brand}/><span>브랜드</span></div>
            </div>
            <div className="ItemList">

            </div>
        </BookmarkPageContainer>
    );
  }
  
  export default BookmarkPage;
  