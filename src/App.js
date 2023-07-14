import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import ProductsListPage from "./pages/ProductsListPage ";
import BookmarkPage from "./pages/BookmarkPage";
import Modal from "./components/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bookmarkOn from "./img/bookmark-on.png";
import bookmarkOff from "./img/bookmark-off.png";

function App() {
  const [bookmarkedItemsId, setBookmarkedItemsId] = useState(() => {
    const savedItems = localStorage.getItem("myBookmark");
    if (savedItems) {
      return JSON.parse(savedItems);
    } else {
      return [];
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [clickedItem, setClickedItem] = useState("");
  const [visibleItemsCount, setVisibleItemsCount] = useState(12);
  const appRef = useRef();

  useEffect(() => {
    localStorage.setItem("myBookmark", JSON.stringify(bookmarkedItemsId));
  }, [bookmarkedItemsId]);

  useEffect(() => {
    const handleScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        setVisibleItemsCount((prevValue) => prevValue + 12);
      }
    };
    const appElement = appRef.current;
    appElement.addEventListener("scroll", handleScroll);
    return () => appElement.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShowModal = (item) => {
    setClickedItem(item);
    setShowModal(!showModal);
  };

  const CloseButton = ({ closeToast }) => (
    <i className="material-icons" onClick={closeToast}></i>
  );

  const notifyAdd = () =>
    toast("상품이 북마크에 추가되었습니다.", {
      icon: ({ theme, type }) => (
        <img
          src={bookmarkOn}
          style={{ width: "16px", height: "16px" }}
          alt="bookmarkAdd"
        />
      ),
      style: {
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: "700",
        color: "#000000",
        width: "300px",
        height: "52px",
      },
    });

  const notifyDelete = () =>
    toast("상품이 북마크에서 제거되었습니다.", {
      icon: ({ theme, type }) => (
        <img
          src={bookmarkOff}
          style={{ width: "16px", height: "16px" }}
          alt="bookmarkDelete"
        />
      ),
      style: {
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: "700",
        color: "#000000",
        width: "316px",
        height: "52px",
      },
    });

  return (
    <BrowserRouter>
      <div className="App" ref={appRef}>
        <Header></Header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  bookmarkedItemsId={bookmarkedItemsId}
                  setBookmarkedItemsId={setBookmarkedItemsId}
                  handleShowModal={handleShowModal}
                  notifyAdd={notifyAdd}
                  notifyDelete={notifyDelete}
                />
              }
            ></Route>
            <Route
              path="/products/list"
              element={
                <ProductsListPage
                  bookmarkedItemsId={bookmarkedItemsId}
                  setBookmarkedItemsId={setBookmarkedItemsId}
                  handleShowModal={handleShowModal}
                  notifyAdd={notifyAdd}
                  notifyDelete={notifyDelete}
                  visibleItemsCount={visibleItemsCount}
                  setVisibleItemsCount={setVisibleItemsCount}
                />
              }
            ></Route>
            <Route
              path="/bookmark"
              element={
                <BookmarkPage
                  bookmarkedItemsId={bookmarkedItemsId}
                  setBookmarkedItemsId={setBookmarkedItemsId}
                  handleShowModal={handleShowModal}
                  notifyAdd={notifyAdd}
                  notifyDelete={notifyDelete}
                  visibleItemsCount={visibleItemsCount}
                  setVisibleItemsCount={setVisibleItemsCount}
                />
              }
            ></Route>
          </Routes>
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
        {showModal ? (
          <Modal
            clickedItem={clickedItem}
            bookmarkedItemsId={bookmarkedItemsId}
            setBookmarkedItemsId={setBookmarkedItemsId}
            handleShowModal={handleShowModal}
            notifyAdd={notifyAdd}
            notifyDelete={notifyDelete}
          />
        ) : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
