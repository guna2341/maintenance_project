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
        blocks
    }
) => {
    return (
        <>
            <Swiper
                slidesPerView={3.2}
                pagination={{
                    clickable: true,
                }}
                mousewheel={true}   
                navigation={true}
                modules={[FreeMode, Mousewheel, Navigation, Pagination]}
                className='swiper'
            >
                {blocks.map(item => (
                    <SwiperSlide key={item.id}>
                        <BlockCard
                            key={item?.id}
                            block={item?.block.toUpperCase()}
                            states={item?.states}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
