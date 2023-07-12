import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import ProductsListPage from "./pages/ProductsListPage ";
import BookmarkPage from "./pages/BookmarkPage";

function App() {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  useEffect(() => {
    localStorage.setItem('myBookmark', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  useEffect(() => console.log(bookmarkedItems), [bookmarkedItems]);

  const handleBookmark = (item)=>{
    if(true){
    setBookmarkedItems(bookmarkedItems.filter(el=>el.id!==item.id))}
    else{setBookmarkedItems([...bookmarkedItems, item])}
    //북마크 추가,삭제 하는중
  }

  return (
    <BrowserRouter>
    <div className="App">
      <Header></Header>
      <main>
      <Routes>
      <Route path="/" element={<MainPage 
      bookmarkedItems={bookmarkedItems} 
      setBookmarkedItems={setBookmarkedItems}
      handleBookmark={handleBookmark}
      />}></Route>
      <Route path="/products/list" element={<ProductsListPage/>}></Route>
      <Route path="/bookmark" element={<BookmarkPage/>}></Route>
      </Routes>
      </main>
      <Footer></Footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
