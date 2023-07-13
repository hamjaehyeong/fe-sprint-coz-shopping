import { BrowserRouter, Routes, Route,  useLocation } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import ProductsListPage from "./pages/ProductsListPage ";
import BookmarkPage from "./pages/BookmarkPage";
import Modal from "./components/Modal";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bookmarkOn from './img/bookmark-on.png';
import bookmarkOff from './img/bookmark-off.png';


function App() {
  const [bookmarkedItemsId, setBookmarkedItemsId] = useState(() => {
    const savedItems = localStorage.getItem('myBookmark');
    if (savedItems) {
      return JSON.parse(savedItems);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('myBookmark', JSON.stringify(bookmarkedItemsId));
  }, [bookmarkedItemsId]);

  const [showModal, setShowModal] = useState(false);
  const [clickedItem, setClickedItem] = useState('');

  const handleShowModal = (item) => {
    setClickedItem(item);
    setShowModal(!showModal);
  }

  // useEffect(() => console.log(bookmarkedItemsId), [bookmarkedItemsId]);
  const CloseButton = ({ closeToast }) => (
    <i
      className="material-icons"
      onClick={closeToast}
    >
    </i>
  );

  const notifyAdd = () => toast("상품이 북마크에 추가되었습니다.", {
    icon: ({ theme, type }) => <img src={bookmarkOn} style={{width:'16px',height:'16px'}} alt="bookmarkAdd"/>,
    style: {
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '700',
      color:'#000000',
      width:'300px',
      height:'52px',
    }
  });

  const notifyDelete = () => toast("상품이 북마크에서 제거되었습니다.", {
    icon: ({ theme, type }) => <img src={bookmarkOff} style={{width:'16px',height:'16px'}} alt="bookmarkDelete"/>,
    style: {
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '700',
      color:'#000000',
      width:'316px',
      height:'52px',
    }
  });

///////////////////////////////////////////////////////////////////
  // 먼저 보여지는 아이템의 수를 상태로 설정합니다. 초기값은 12입니다.
const [visibleItemsCount, setVisibleItemsCount] = useState(12);

// useRef를 이용하여 .App 엘리먼트에 대한 참조를 생성합니다. 
const appRef = useRef();

useEffect(() => {
  // 스크롤 이벤트 핸들러를 정의합니다. 
  const handleScroll = (e) => {
    // scrollTop: .App 요소에서 현재 스크롤된 영역의 높이
    // clientHeight: .App 요소의 높이
    // scrollHeight: .App 요소의 총 내용 높이
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    // 만약 .App 요소의 총 내용 높이에서 현재 스크롤된 영역의 높이를 뺀 값이 
    // .App 요소의 높이보다 100 픽셀 작다면 (즉, 스크롤이 하단 100픽셀 이내로 내려왔다면),
    // 아이템을 더 로드합니다.
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      console.log("Bottom of the div has been reached.");
      setVisibleItemsCount((prevValue) => prevValue + 12);
    }
  };

  // .App 요소에 대한 참조를 가져옵니다.
  const appElement = appRef.current;

  // 스크롤 이벤트 리스너를 .App 요소에 추가합니다.
  appElement.addEventListener('scroll', handleScroll);

  // 컴포넌트가 unmount될 때 스크롤 이벤트 리스너를 제거합니다.
  // 이렇게 하는 이유는 컴포넌트가 사라진 후에도 이벤트 핸들러가 호출되는 것을 방지하기 위함입니다.
  return () => appElement.removeEventListener('scroll', handleScroll);
}, []); 


///////////////////////////////////////////////////////////
  
  return (
    <BrowserRouter>
      <div className="App" ref={appRef}>
        <Header></Header>
        <main>
          <Routes>
            <Route path="/" element={<MainPage
              bookmarkedItemsId={bookmarkedItemsId}
              setBookmarkedItemsId={setBookmarkedItemsId}
              handleShowModal={handleShowModal}
              notifyAdd={notifyAdd}
              notifyDelete={notifyDelete}
            />}></Route>
            <Route path="/products/list" element={
              <ProductsListPage
                bookmarkedItemsId={bookmarkedItemsId}
                setBookmarkedItemsId={setBookmarkedItemsId}
                handleShowModal={handleShowModal}
                notifyAdd={notifyAdd}
                notifyDelete={notifyDelete}
                visibleItemsCount={visibleItemsCount}
                />}></Route>
            <Route path="/bookmark" element={<BookmarkPage />}></Route>
          </Routes>
          {showModal ? <Modal clickedItem={clickedItem}
            bookmarkedItemsId={bookmarkedItemsId}
            setBookmarkedItemsId={setBookmarkedItemsId}
            handleShowModal={handleShowModal}
            notifyAdd={notifyAdd}
            notifyDelete={notifyDelete}
          /> : null}
          <div>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme="light"
              closeButton={CloseButton}
            />
          </div>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
