import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch('/Banner.json')
      .then(res => res.json())
      .then(data => setSlides(data))
      .catch(err => console.error('Failed to load slides:', err));
  }, []);

  if (slides.length === 0) {
    return <p className="text-center py-20 text-gray-600">Loading banner...</p>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      effect="fade"
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      className="w-full rounded-2xl h-[450px] md:h-[600px] lg:h-[700px]"
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
         
            <div className="absolute inset-0  bg-gradient-to-b from-black/80 via-black/60 to-black/80 flex items-center justify-center px-8 md:px-20">
              <div className="max-w-4xl text-center">
                {/* Title */}
                <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="mt-6 text-gray-200 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                  {slide.description}
                </p>

                {/* Button */}
                <Link to="/allRoom">
                  <button
                    aria-label="Explore Rooms"
                    className="btn-banner mt-10 px-12 py-4  font-semibold rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-6 focus:ring-yellow-400 focus:ring-opacity-50"
                  >
                    Explore Rooms
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
