import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import './swiper.css';
import { BlockCard } from './blockCard';

export const SwiperComponent = (
    {
        blocks,
        onClick
    }
) => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={25} 
                pagination={{
                    clickable: true,
                }}
                mousewheel={true}   
                navigation={true}
                modules={[FreeMode, Mousewheel, Navigation, Pagination]}
                className='swiper'
            >
                {blocks.map((item,index) => (
                    <SwiperSlide key={item.id}
                    onClick={() => onClick(index)}
                    >
                        <BlockCard
                            key={item?.id}
                            index={index}
                            block={item?.block.toUpperCase()}
                            states={item?.states}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
