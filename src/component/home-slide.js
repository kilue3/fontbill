import React, { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import axios from 'axios';





// const items = [
//     {
//         src: 'https://tzs-global.com/website_factor-image/more_img/S2.jpg',

//     },
//     {
//         src: 'https://tzs-global.com/website_factor-image/more_img/S3.jpg',

//     },
//     {
//         src: 'https://tzs-global.com/website_factor-image/more_img/SV3.jpg',

//     },
//     {
//         src: 'https://tzs-global.com/website_factor-image/more_img/SV2.jpg',

//     }
// ];

const Slide = (props) => {
    const [items, setitems] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/Setup_slide")
            .then((response) => {
                setitems(response.data);
            });
    }, []);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.sst_id}
            >
                <img src={item.ssd_slide} alt={item.ssd_name} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />


            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}

export default Slide;