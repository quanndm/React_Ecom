import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/shoping-cart/cartItemsSlice';
import { remove } from '../redux/product-modal/productModalSlice';
import Button from './Button';
import numberWithCommas from '../utils/numberWithCommas';
const ProductView = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {product} = props;
    if(product === undefined) product = {
        price: 0,
        title: "",
        colors: [],
        size:[]
    };
    const [previewImg, setPreviewImg] = useState(product.image01)
    const [descriptionExpand, setDescriptionExpand] = useState(false)
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);
    // cập nhật số lượng
    const updateQuantity = (type)=>{
        if (type === "plus") {
            setQuantity(quantity+1);
        }else{
            setQuantity(quantity - 1 < 1 ? quantity : quantity -1 )
        }
    }
    // set về giá trị ban đầu khi click vào sản phẩm khác
    useEffect(() => {
        setPreviewImg(product.image01);
        setQuantity(1);
        setColor(undefined);
        setSize(undefined);

    }, [product]);
    // 
    const check = ()=>{
        if (color===undefined) {
            alert("vui lòng chọn màu sắc");
            return false
        }
        if (size===undefined) {
            alert("vui lòng chọn kích cỡ");
            return false
        }
        return true;
    }
    // thêm vào giỏ hàng
    const addToCart = ()=>{
        if(check()){
            dispatch(addItem({
                slug: product.slug,
                color: color,
                size: size,
                quantity: quantity,
                price: product.price
            }))
        }
    }
    // mua hàng
    const goToCart = ()=>{
        if(check()){
            dispatch(addItem({
                slug: product.slug,
                color: color,
                size: size,
                quantity: quantity,
                price: product.price
            }))
            dispatch(remove());
            navigate("/cart");
        } 
    }
    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={()=>setPreviewImg(product.image01)}>
                        <img src={product.image01} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={()=>setPreviewImg(product.image02)}>
                        <img src={product.image02} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product-description ${descriptionExpand && "expand"}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div 
                        className="product-description__content"
                        dangerouslySetInnerHTML={{__html: product.description}}
                    />
                    <div className="product-description__toggle">
                        <Button 
                            size="sm" 
                            onClick={()=>setDescriptionExpand(!descriptionExpand)}
                        >
                            {descriptionExpand?"Thu gọn":"Xem thêm"}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">
                    {product.title}
                </h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price)}
                    </span>
                </div>
                {/* màu sắc */}
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.colors.map((item, index)=>(
                                <div 
                                    key={index}
                                    className={`product__info__item__list__item ${color===item && "active"}`}
                                    onClick={()=>setColor(item)}
                                >
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* kích cỡ */}
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.size.map((item, index)=>(
                                <div 
                                    key={index}
                                    className={`product__info__item__list__item ${size===item&&"active"}`}
                                    onClick={()=>setSize(item)}
                                >
                                    <div className="product__info__item__list__item__size">
                                        {item}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* số lượng */}
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div 
                            className="product__info__item__quantity__btn"
                            onClick={()=>updateQuantity("minus")}
                        >
                            <i className="bx bx-minus"/>
                        </div>

                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>

                        <div 
                            className="product__info__item__quantity__btn"
                            onClick={()=>updateQuantity("plus")}
                        >
                            <i className="bx bx-plus"/>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="product__info__item">
                    <Button onClick={()=>addToCart()}>Thêm vào giỏ</Button>
                    <Button onClick={()=>goToCart()}>Mua ngay</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand && "expand"}`}>
                <div className="product-description__title">
                    Chi tiết sản phẩm
                </div>
                <div 
                    className="product-description__content"
                    dangerouslySetInnerHTML={{__html: product.description}}
                />
                <div className="product-description__toggle">
                    <Button 
                        size="sm" 
                        onClick={()=>setDescriptionExpand(!descriptionExpand)}
                    >
                        {descriptionExpand?"Thu gọn":"Xem thêm"}
                    </Button>
                </div>
                </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default ProductView
