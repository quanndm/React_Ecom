import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import header-footer
import Header from "./Header";
import Footer from "./Footer";
// import page
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import ProductViewModal from "./ProductViewModal";
const Layout = (props) => {
    return (
        <Router>
            <Header />
            <div className="container">
                <div className="main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/catalog/:slug" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </div>
            <Footer />
            <ProductViewModal />
        </Router>
    )
}
export default Layout
