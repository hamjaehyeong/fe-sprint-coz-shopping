import styled from "styled-components"
import { useState, useEffect } from "react";

import vector from '../img/vector.png';
import bookmarkOn from '../img/bookmark-on.png';
import bookmarkOff from '../img/bookmark-off.png';

export const ModalContainer = styled.div`
.modalBackdrop{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:white;
    opacity: 0.5;
    z-index:101;
}
.modalImg{
    position:absolute;
    width:744px;
    height:480px;
    left:268px;
    top:176px;
    opacity:1;
    z-index:102;
    border-radius:12px;
    box-shadow: 0 0 36px rgba(0, 0, 0, 0.5);

}   
.xIcon{
    position:absolute;
    left:75.5%;
    top: 24%;
    width:23px;
    height:23px;
    z-index:103;
    &:hover{
    cursor: pointer;
}
}

.content{
    position:absolute;
    left:23%;
    top:73%;
    display:flex;
    align-items:center;
    z-index:103;
    font-size:24px;
    color:white;
    font-weight:700;
}
.bookmarkIcon{
    width:24px;
    height:24px;
    margin-right:8px;
    &:hover{
    cursor: pointer;
}
}

`

function Modal({clickedItem, bookmarkedItemsId, setBookmarkedItemsId, handleShowModal, notifyAdd, notifyDelete}) {

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
      setIsBookmarked(bookmarkedItemsId.includes(clickedItem.id));
    }, [bookmarkedItemsId]);

    const handleBookmark = (item) => {
      if (isBookmarked) {
        setBookmarkedItemsId(prevItems => prevItems.filter(itemId => itemId !== clickedItem.id));
        notifyDelete();
      } else {
        setBookmarkedItemsId(prevItems => [item.id, ...prevItems]);
        notifyAdd();
      }
    }

    return (
        <ModalContainer>
            <div className="modalBackdrop" onClick={()=>handleShowModal(clickedItem)}></div>
            <img className="modalImg" src={clickedItem.type ==='Brand'? clickedItem.brand_image_url : clickedItem.image_url} alt="itemImage"/>
            <img className="xIcon" src={vector} onClick={()=>handleShowModal(clickedItem)}/>
            <div className="content">
                <img src={isBookmarked ? bookmarkOn : bookmarkOff} 
                className="bookmarkIcon" alt="bookmarkIcon" 
                onClick={()=>handleBookmark(clickedItem)}/>
                <span>{clickedItem.type ==='Brand'? clickedItem.brand_name : clickedItem.title}</span>
            </div>
        </ModalContainer>
    );
  }
  
  export default Modal;
  