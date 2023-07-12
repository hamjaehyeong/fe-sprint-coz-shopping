import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import ProductsListPage from "./pages/ProductsListPage ";
import BookmarkPage from "./pages/BookmarkPage";

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

  // useEffect(() => console.log(bookmarkedItems), [bookmarkedItems]);

  return (
    <BrowserRouter>
    <div className="App">
      <Header></Header>
      <main>
      <Routes>
      <Route path="/" element={<MainPage 
      bookmarkedItems={bookmarkedItems} 
      setBookmarkedItems={setBookmarkedItems}
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
