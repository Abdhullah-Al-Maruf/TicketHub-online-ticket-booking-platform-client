"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import HeroBanner from "./HeroBanner";
import FeatureBanner from "./FeatureBanner";
import PromotionalBanner from "./PromotionalBanner";



export default function BannerSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
  
       <PromotionalBanner/>
      </SwiperSlide>

      <SwiperSlide>
      <FeatureBanner/>
      </SwiperSlide>

      <SwiperSlide>
          <HeroBanner />
      </SwiperSlide>
    </Swiper>
  );
}