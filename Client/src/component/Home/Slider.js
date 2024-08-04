import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "./Slider.css";

// import img1 from "../../img/banner/b1.jpg";
// import img2 from "../../img/banner/b1.jpg";
// import img3 from "../../img/banner/b1.jpg";
// import img4 from "../../img/banner/b1.jpg";
// import img5 from "../../img/banner/b1.jpg";
import img1 from "../../img/banner/1.webp";
import img2 from "../../img/banner/2.jpg";
import img3 from "../../img/banner/3.webp";
import img4 from "../../img/banner/4.jpg";
import img5 from "../../img/banner/5.png";

// import required modules
import { Navigation, Mousewheel, Keyboard } from "swiper";

export default function Slider() {
  return (
    <>
      {/* <h1>Hello</h1> */}
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1}  alt="abc" height="500" style={{ width: "100%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="abc"  height="500" style={{ width: "100%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="abc"  height="500" style={{ width: "100%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4}  alt="abc" height="500" style={{ width: "100%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="abc" 
            src={img5}
            height="500" style={{ width: "100%" }}
            // className="image5"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
