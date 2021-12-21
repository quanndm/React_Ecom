import React, {useEffect, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Button from './Button';
const HeroSlider = props => {
    const data = props.data;
    const timeOut = props.timeOut ? props.timeOut: 3000;
    const [activeSlider, setActiveSlider] = useState(0);
    const next =useCallback(()=>{
        const index = activeSlider + 1 === data.length?0:activeSlider+1;
        setActiveSlider(index);
    }, [activeSlider, data.length])
    const prev = ()=>{
        const index = activeSlider - 1 < 0 ?data.length - 1:activeSlider-1;
        setActiveSlider(index);
    }
    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(()=>{
                next();
            }, timeOut)
            return ()=>{
                clearInterval(slideAuto);
            }
        }
        
    }, [next, timeOut, props])
    return (
        <div className="hero-slider">
            {
                data.map((item, index) => (
                    <HeroSliderItem key={index} item={item} action={index === activeSlider} />
                ))
            }
            {
                props.control ? (
                    <div className="hero-slider__control">
                        <div className="hero-slider__control__item" onClick={()=>prev()}>
                            <i  className="bx bx-chevron-left"/>
                        </div>
                        <div className="hero-slider__control__item">
                            <div className="index">
                                {activeSlider + 1} / {data.length}
                            </div>
                        </div>
                        <div className="hero-slider__control__item" onClick={()=>next()}>
                            <i  className="bx bx-chevron-right"/>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number
}
const HeroSliderItem = (props) => {
    return (
        <div className={`hero-slider__item ${props.action ? "active" : ""}`}>
            <div className="hero-slider__item__info">
                <div className={`hero-slider__item__info__title color-${props.item.color}`}>
                    <span>{props.item.title}</span>
                </div>
                <div className="hero-slider__item__info__description">
                    <span>{props.item.description}</span>
                </div>
                <div className="hero-slider__item__info__btn">
                    <Link to={props.item.path}>
                        <Button
                            backgroundColor={props.item.color}
                            icon="bx bx-cart"
                            animate={true}
                        >
                            xem chi tiết
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="hero-slider__item__image">
                <div className={`shape bg-${props.item.color}`}></div>
                <img src={props.item.img} alt="" />
            </div>
        </div>
    )
}

export default HeroSlider
