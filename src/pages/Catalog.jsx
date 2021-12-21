import React, { useCallback, useEffect, useRef, useState } from 'react'
import Helmet from "../components/Helmet";
// import Grid from "../components/Grid";
// import ProductCard from "../components/ProductCard";
import CheckBox from "../components/CheckBox";
import Button from '../components/Button';
// import data
import productData from "../assets/fake-data/products";
import category from "../assets/fake-data/category";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import InfinityList from '../components/InfinityList';
const Catalog = () => {
    
    const initFilter={
        category : [],
        color: [],
        size: [ ]
    }
    const productList = productData.getAllProducts();
    const [products, setProducts] = useState(productList)
    const [filter, setFilter] = useState(initFilter); 
    // thêm bộ lọc
    const filterSelect = (type, checked, item)=>{
        if (checked) {
            switch (type) {
                case "CATEGORY":
                    setFilter({...filter, category:[...filter.category, item.categorySlug]})
                    break;
                case "COLOR":
                    setFilter({...filter, color:[...filter.color, item.color]})
                    break;
                case "SIZE":
                    setFilter({...filter, size:[...filter.size, item.size]})
                    break;
                default: 
                    break   
            }
        }else{
            switch (type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e=>e!==item.categorySlug);
                    setFilter({...filter, category: newCategory});
                    break;
                case "COLOR":
                    const newColor = filter.color.filter(e=>e!==item.color);
                    setFilter({...filter, color:newColor})
                    break;
                case "SIZE":
                    const newSize = filter.size.filter(e=>e!==item.size);
                    setFilter({...filter, size:newSize})
                    break;
                default: 
                    break   
            }
        }
    }
    // clear filter
    const clearFilter = ()=>setFilter(initFilter);
    // xử lý dữ liệu sau khi có bộ lọc được chọn
    const updateProduct = useCallback(
        () => {
            let tmp = productList;
            if (filter.category.length > 0) {
                tmp = tmp.filter(e=>filter.category.includes(e.categorySlug))
            }
            if (filter.color.length > 0) {
                tmp = tmp.filter(e=>{
                    const check = e.colors.find(color=>filter.color.includes(color));
                    return check !== undefined;
                })
            }
            if (filter.size.length > 0) {
                tmp = tmp.filter(e=>{
                    const check = e.size.find(size=>filter.size.includes(size));
                    return check !== undefined;
                })
            }
            setProducts(tmp);
        },
        [filter, productList],
    )
    // component will update
    useEffect(() => {
        updateProduct();
    }, [updateProduct])
    // hide/show filter
    const filterRef = useRef(null);
    const shouldHideFilter = ()=> filterRef.current.classList.toggle("active");
    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={()=>shouldHideFilter()}>
                        <i className="bx bx-left-arrow-alt"/>
                    </div>
                    {/* Danh mục sản phẩm */}
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {category.map((item, index)=>(
                                <div    
                                    key={index} 
                                    className="catalog__filter__widget__content__item" 
                                >
                                    <CheckBox 
                                        label={item.display}
                                        onChange={(input)=>filterSelect("CATEGORY",input.checked, item)}
                                        checked={filter.category.includes(item.categorySlug)}
                                    />
                                </div>
                                
                            ))}
                        </div>
                    </div>
                    {/* end Danh mục sản phẩm */}
                    {/* Màu sắc */}
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Màu sắc
                        </div>
                        <div className="catalog__filter__widget__content">
                            {colors.map((item, index)=>(
                                <div    
                                    key={index} 
                                    className="catalog__filter__widget__content__item" 
                                >
                                    <CheckBox 
                                        label={item.display}
                                        onChange={(input)=>filterSelect("COLOR",input.checked, item)}
                                        checked={filter.color.includes(item.color)}
                                    />
                                </div>
                                
                            ))}
                        </div>
                    </div>
                    {/* End màu sắc */}
                    {/* Kích cỡ */}
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Kích cỡ
                        </div>
                        <div className="catalog__filter__widget__content">
                            {size.map((item, index)=>(
                                <div    
                                    key={index} 
                                    className="catalog__filter__widget__content__item" 
                                >
                                    <CheckBox 
                                        label={item.display}
                                        onChange={(input)=>filterSelect("SIZE",input.checked, item)}
                                        checked={filter.size.includes(item.size)}
                                    />
                                </div>
                                
                            ))}
                        </div>
                    </div>
                    {/* End Kích cỡ */}
                    {/* Xóa bộ lọc */}
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size='sm' onClick={clearFilter}>Xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={()=>shouldHideFilter()}>Bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList 
                        data={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog
