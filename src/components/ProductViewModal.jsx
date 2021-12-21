import React, { useEffect, useState } from 'react'
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from "../redux/product-modal/productModalSlice";
// import data
import productData from "../assets/fake-data/products";
import ProductView from "./ProductView";
const ProductViewModal = () => {
    const productSlug = useSelector((state)=> state.productModal.value);
    const dispatch = useDispatch(); 
    const [product, setProduct] = useState(undefined)
    useEffect(() => {
       setProduct(productData.getProductBySlug(productSlug))
    }, [productSlug])
    return (
        <div className={`product-view__modal ${product && "active"}`}>
            <div className="product-view__modal__content">
                <ProductView product={product}/>
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"
                        onClick={()=>dispatch(remove() )}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewModal
