import { useEffect, useState } from "react"
import styled from "styled-components"

import Item from "../components/Item"

export const MainPageContainer = styled.div`
background-color:white;
display:flex;
flex-direction:column;
justify-content:center;
padding: 24px 76px 24px 76px;
h2{
    font-weight:600;
}
`
export const ListContainer = styled.ul`
display:flex;

margin-top:12px;
margin-bottom:12px;
`

function MainPage(bookmarkedItems, setBookmarkedItems, handleBookmark) {
    const [listData, setListData] = useState([]);
    
    useEffect(() =>{
        fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=4')
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
        <MainPageContainer>
            <div>
                <h2>상품 리스트</h2>
                <ListContainer>
                    {listData.map((item,idx)=>
                    <Item 
                    key={idx} 
                    item={item} 
                    bookmarkedItems={bookmarkedItems} 
                    setBookmarkedItems={setBookmarkedItems}
                    handleBookmark={handleBookmark}
                    />)}
                </ListContainer>
            </div>
            <div>
                <h2>북마크 리스트</h2>
                <ListContainer>
                {listData.map((item,idx)=>
                    <Item 
                    key={idx} 
                    item={item} 
                    bookmarkedItems={bookmarkedItems} 
                    setBookmarkedItems={setBookmarkedItems}
                    handleBookmark={handleBookmark}
                    />)}
                </ListContainer>
                </div>
        </MainPageContainer>
    );
  }
  
  export default MainPage;
  