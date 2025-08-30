import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import './swiper.css';
import { BlockCard } from './blockCard';
import { UseDashboardStore } from '../stores';

export const SwiperComponent = (
    {
        blocks,
        onClick,
    }
) => {
    const loaders = UseDashboardStore(e => e.loaders);
    return (
        <>
            <Swiper
                spaceBetween={25}
                pagination={{
                    clickable: true,
                }}
                loop={false}
                mousewheel={true}   
                navigation={true}
                modules={[FreeMode, Mousewheel, Navigation, Pagination]}
                className='swiper'
                breakpoints={{
                    0: { slidesPerView: 1 },      
                    451: { slidesPerView: 'auto' } 
                }}
            >
                {loaders.getLoading ? Array(4).fill(null).map((_, index) => (
                        <SwiperSlide key={index}>
                            <BlockCard loading={true} index={index}  />
                        </SwiperSlide>
                    ))
                    : blocks?.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            onClick={() => onClick(index)}
                        >
                            <BlockCard
                                loading={false}
                                index={index}
                                block={item?.block?.toUpperCase()}
                                states={item?.states}
                            />
                        </SwiperSlide>
                    ))}

            </Swiper>
        </>
    )
}
