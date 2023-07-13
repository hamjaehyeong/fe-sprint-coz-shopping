import { useEffect, useState } from "react"
import styled from "styled-components"

import Item from "../components/Item"

export const MainPageContainer = styled.div`
background-color:white;
display:flex;
flex-direction:column;
justify-content:center;
margin-top:80px;
padding: 24px 76px 24px 76px;
height:694px;
h2{
    font-weight:600;
}
`
export const ListContainer = styled.ul`
display:flex;
margin-top:12px;
margin-bottom:12px;
height:267px;
width:1128px;
 & > * {
  margin-right: 24px;
}

`

function MainPage({ bookmarkedItemsId, setBookmarkedItemsId, handleShowModal, notifyAdd, notifyDelete }) {
    const [listData, setListData] = useState([]);
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    useEffect(() => {
        // listData가 업데이트되었을 때,
        // bookmarkedItemsId에 해당하는 아이템들을 찾아 bookmarkedItems 상태를 업데이트합니다.
        const newBookmarkedItems = listData.filter(item => bookmarkedItemsId.includes(item.id));
        setBookmarkedItems(newBookmarkedItems);
      }, [listData, bookmarkedItemsId]); 

    useEffect(() => {
        fetch('http://cozshopping.codestates-seb.link/api/v1/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(json => setListData([...json]))
            .catch(error => console.error(error))
    }
        , [])


    return (
        <MainPageContainer>
            <div>
                <h2>상품 리스트</h2>
                <ListContainer>
                    {listData.slice(0, 4).map(item =>
                        <Item
                            key={item.id}
                            item={item}
                            bookmarkedItemsId={bookmarkedItemsId}
                            setBookmarkedItemsId={setBookmarkedItemsId}
                            handleShowModal={handleShowModal}
                            notifyAdd={notifyAdd}
                            notifyDelete={notifyDelete}
                        />)}
                </ListContainer>
            </div>
            <div>
                <h2>북마크 리스트</h2>
                <ListContainer>
                    {bookmarkedItems.slice(0, 4).map(bookmarkedItem =>
                        <Item
                            key={bookmarkedItem.id}
                            item={bookmarkedItem}
                            bookmarkedItemsId={bookmarkedItemsId}
                            setBookmarkedItemsId={setBookmarkedItemsId}
                            handleShowModal={handleShowModal}
                            notifyAdd={notifyAdd}
                            notifyDelete={notifyDelete}
                        />
                    )}
                </ListContainer>
            </div>
        </MainPageContainer>
    );
}

export default MainPage;
