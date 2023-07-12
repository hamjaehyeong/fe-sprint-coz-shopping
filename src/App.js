import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import ProductsListPage from "./pages/ProductsListPage ";
import BookmarkPage from "./pages/BookmarkPage";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header></Header>
      <main>
      <Routes>
      <Route path="/" element={<MainPage/>}></Route>
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
