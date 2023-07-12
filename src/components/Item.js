
import styled from "styled-components"
import { useState, useEffect } from "react";
import bookmarkOn from '../img/bookmark-on.png';
import bookmarkOff from '../img/bookmark-off.png';


export const ItemContainer = styled.li`
list-style: none;
margin-right:24px;
font-size:16px;

&:last-of-type{
     margin-right:0px;
    }
.imgContainer{
    position:relative;
}
.bookmark{
    position:absolute;
    left:228px;
    top:174px;
    width:24px;
    height:24px;
    opacity:1.0;
}
.itemImg{
    width:264px;
    height:210px;
    border-radius:12px;
}
.content{
    display:flex;
    justify-content:space-between;
}
.left{}
.right{
    .discount{
        color:#452CDD;
    }
}

.itemTitle{
    font-weight:800;
}

`

function Item({item, bookmarkedItems, setBookmarkedItems}) {

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        setIsBookmarked(bookmarkedItems.some(bookmarkedItem => bookmarkedItem.id === item.id));
      }, [bookmarkedItems]);

      const handleBookmark = (item) => {
        if (isBookmarked) {
          setBookmarkedItems(bookmarkedItems.filter(el => el.id !== item.id));
        } else {
          setBookmarkedItems([item, ...bookmarkedItems]);
        }
      }

    if (item.type === 'Product') {
        return (
        <ItemContainer>
            <div className="imgContainer">
                <img src={item.image_url} alt="item" className="itemImg"/>
                <img src={isBookmarked ? bookmarkOn : bookmarkOff} className="bookmark" alt="bookmarkIcon" onClick={()=>handleBookmark(item)}
                />
            </div>
            <div className="content">
                <div className="left"><p className="itemTitle">{item.title}</p></div>
                <div className="right">
                    <p className="discount">{item.discountPercentage}%</p>
                    <p>{item.price}</p>
                </div>
                </div>
        </ItemContainer>
    );
}
    else if (item.type === 'Category') { 
        return (
        <ItemContainer>
            <div className="imgContainer">
                <img src={item.image_url} alt="item" className="itemImg"/>
                <img src={isBookmarked ? bookmarkOn : bookmarkOff} className="bookmark" alt="bookmarkIcon" onClick={()=>handleBookmark(item)}/>
            </div>
            <div><p className="itemTitle"># {item.title}</p></div>
        </ItemContainer>
    );
    }
    else if (item.type === 'Brand') {
        return (
            <ItemContainer>
                <div className="imgContainer">
                    <img src={item.brand_image_url}  alt="item" className="itemImg"/>
                    <img src={isBookmarked ? bookmarkOn : bookmarkOff} className="bookmark" alt="bookmarkIcon" onClick={()=>handleBookmark(item)}/>
                </div>
                <div className="content">
                    <div className="left"><p className="itemTitle">{item.brand_name}</p></div>
                    <div className="right">
                        <p>관심고객수</p>
                        <p>{item.follower}</p>
                    </div>
                </div>
            </ItemContainer>
        );
    }
    else if (item.type === 'Exhibition') {
        return (
            <ItemContainer>
            <div className="imgContainer">
                <img src={item.image_url} alt="item" className="itemImg"/>
                <img src={isBookmarked ? bookmarkOn : bookmarkOff} className="bookmark" alt="bookmarkIcon" onClick={()=>handleBookmark(item)}/>
            </div>
            <div><p className="itemTitle">{item.title}</p><p>{item.sub_title}</p></div>
            </ItemContainer>
        );
    }
    else {
        return null; // 혹은 대체 컴포넌트
    }
  }
  
  export default Item;
  
// 상품("type": "Product") => "title": "싱글브레스트 코트", "discountPercentage": 30, "price": "149000",
// 카테고리 "type": "Category" => # "title": "미술", 
// 브랜드 "type": "Brand" => "brand_name": "소니", 관심고객수 "follower": 6808 //브랜드이미지사용
// 기획전 "type": "Exhibition" => "title": "오감 발달에 최고", "sub_title": "아이 장난감 BEST",

//   [
//     {
//         "id": 74,
//         "type": "Brand",
//         "title": null,
//         "sub_title": null,
//         "brand_name": "소니",
//         "price": null,
//         "discountPercentage": null,
//         "image_url": null,
//         "brand_image_url": "https://images.unsplash.com/photo-1526509706191-c268f28e9ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//         "follower": 6808
//     },
//     {
//         "id": 58,
//         "type": "Product",
//         "title": "싱글브레스트 코트",
//         "sub_title": null,
//         "brand_name": null,
//         "price": "149000",
//         "discountPercentage": 30,
//         "image_url": "https://images.unsplash.com/photo-1514813836041-518668f092b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//         "brand_image_url": null,
//         "follower": null
//     },
//     {
//         "id": 80,
//         "type": "Exhibition",
//         "title": "오감 발달에 최고",
//         "sub_title": "아이 장난감 BEST",
//         "brand_name": null,
//         "price": null,
//         "discountPercentage": null,
//         "image_url": "https://images.unsplash.com/photo-1575364289437-fb1479d52732?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
//         "brand_image_url": null,
//         "follower": null
//     },
//     {
//         "id": 28,
//         "type": "Category",
//         "title": "미술",
//         "sub_title": null,
//         "brand_name": null,
//         "price": null,
//         "discountPercentage": null,
//         "image_url": "https://images.unsplash.com/photo-1537884557178-342a575d7d16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
//         "brand_image_url": null,
//         "follower": null
//     }
// ]
