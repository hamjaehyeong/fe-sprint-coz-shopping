
import styled from "styled-components"
import { useState, useEffect } from "react";
import bookmarkOn from '../img/bookmark-on.png';
import bookmarkOff from '../img/bookmark-off.png';

export const ItemContainer = styled.li`
list-style: none;
font-size:16px;

&:last-of-type{
     margin-right:0px;
    }
.imgContainer{
    position:relative;
}
.bookmarkIcon{
    position:absolute;
    left:228px;
    top:174px;
    width:24px;
    height:24px;
    opacity:1.0;
    &:hover{
    cursor: pointer;
}
}
.itemImg{
    width:264px;
    height:210px;
    border-radius:12px;
    &:hover{
    cursor: pointer;
}
}
.content{
    display:flex;
    justify-content:space-between;
    margin-bottom:12px;
}
.left{}
.right{
    display:flex;
    flex-direction:column;
    align-items:flex-end;

}
.discount{
        color:#452CDD;
        font-weight:800;
}
.followerNum{
        font-weight:700;
}
.itemTitle{
    font-weight:800;
}
.itemTitleProduct{
    
    max-width:190px;
    font-weight:800;
}
.subTitle{font-weight:400;}
`

function Item({item, bookmarkedItemsId, setBookmarkedItemsId, handleShowModal, notifyAdd, notifyDelete}) {

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        setIsBookmarked(bookmarkedItemsId.includes(item.id));
      }, [bookmarkedItemsId, item]);

      const handleBookmark = () => {
        if (isBookmarked) {
          setBookmarkedItemsId(prevItems => prevItems.filter(itemId => itemId !== item.id));
          notifyDelete();
        } else {
          setBookmarkedItemsId(prevItems => [item.id, ...prevItems]);
          notifyAdd();
        }
      }

    if (item.type === 'Product') {
        return (
        <ItemContainer>
            <div className="imgContainer">
                <img src={item.image_url} alt="item" className="itemImg" 
                onClick={()=>handleShowModal(item)}/>
                <img src={isBookmarked ? bookmarkOn : bookmarkOff} 
                className="bookmarkIcon" alt="bookmarkIcon" onClick={handleBookmark}
                />
            </div>
            <div className="content">
                <div className="left"><p className="itemTitleProduct">{item.title}</p></div>
                <div className="right">
                    <p className="discount">{item.discountPercentage}%</p>
                    <p>{Number(item.price).toLocaleString()}원</p>
                </div>
                </div>
        </ItemContainer>
    );
}
    else if (item.type === 'Category') { 
        return (
        <ItemContainer>
            <div className="imgContainer">
                <img src={item.image_url} alt="item" className="itemImg" 
                onClick={()=>handleShowModal(item)}/>
                <img src={isBookmarked ? bookmarkOn : bookmarkOff} 
                className="bookmarkIcon" alt="bookmarkIcon" onClick={handleBookmark}/>
            </div>
            <div><p className="itemTitle"># {item.title}</p></div>
        </ItemContainer>
    );
    }
    else if (item.type === 'Brand') {
        return (
            <ItemContainer>
                <div className="imgContainer">
                    <img src={item.brand_image_url}  alt="item" className="itemImg" 
                    onClick={()=>handleShowModal(item)}/>
                    <img src={isBookmarked ? bookmarkOn : bookmarkOff} 
                    className="bookmarkIcon" alt="bookmarkIcon" onClick={handleBookmark}/>
                </div>
                <div className="content">
                    <div className="left"><p className="itemTitle">{item.brand_name}</p></div>
                    <div className="right">
                        <p className="followerNum">관심고객수</p>
                        <p>{Number(item.follower).toLocaleString()}</p>
                    </div>
                </div>
            </ItemContainer>
        );
    }
    else if (item.type === 'Exhibition') {
        return (
            <ItemContainer>
            <div className="imgContainer">
                <img src={item.image_url} alt="item" className="itemImg" 
                onClick={()=>handleShowModal(item)}/>
                <img src={isBookmarked ? bookmarkOn : bookmarkOff} 
                className="bookmarkIcon" alt="bookmarkIcon" onClick={handleBookmark}/>
            </div>
            <div><p className="itemTitle">{item.title}</p><p className="subTitle">{item.sub_title}</p></div>
            </ItemContainer>
        );
    }
    else {
        return null;
    }
  }
  
  export default Item;
  