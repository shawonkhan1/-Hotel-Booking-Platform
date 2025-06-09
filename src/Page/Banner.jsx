import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Loading from '../Components/Loading';

const Banner = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch('/Banner.json')
      .then(res => res.json())
      .then(data => setSlides(data))
      .catch(err => console.error('Failed to load slides:', err));
  }, []);

  if (slides.length === 0) {
    return <Loading />;
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 flex items-center justify-center px-8 md:px-20">
              <div className="max-w-4xl text-center space-y-6">
                
                {/* Animated Title */}
                <motion.h2
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="text-white heading text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg"
                >
                  {slide.title}
                </motion.h2>

                {/* Animated Description */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="text-gray-200 description text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto drop-shadow-md"
                >
                  {slide.description}
                </motion.p>

                {/* Animated Button */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                >
                  <Link to="/allRoom">
                    <button
                      aria-label="Explore Rooms"
                      className="btn-banner mt-6 px-12 py-4 font-semibold rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50"
                    >
                      Explore Rooms
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
