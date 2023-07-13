import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";

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
  const [bookmarkedItems, setBookmarkedItems] = useState(() => {
    const savedItems = localStorage.getItem('myBookmark');
    if (savedItems) {
      return JSON.parse(savedItems);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('myBookmark', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  const [showModal, setShowModal] = useState(false);
  const [clickedItem, setClickedItem] = useState('');

  const handleShowModal = (item) => {
    setClickedItem(item);
    setShowModal(!showModal);
  }

  // useEffect(() => console.log(bookmarkedItems), [bookmarkedItems]);
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


  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <main>
          <Routes>
            <Route path="/" element={<MainPage
              bookmarkedItems={bookmarkedItems}
              setBookmarkedItems={setBookmarkedItems}
              handleShowModal={handleShowModal}
              notifyAdd={notifyAdd}
              notifyDelete={notifyDelete}
            />}></Route>
            <Route path="/products/list" element={<ProductsListPage />}></Route>
            <Route path="/bookmark" element={<BookmarkPage />}></Route>
          </Routes>
          {showModal ? <Modal clickedItem={clickedItem}
            bookmarkedItems={bookmarkedItems}
            setBookmarkedItems={setBookmarkedItems}
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
