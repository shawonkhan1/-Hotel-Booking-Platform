import React from 'react';
import { motion } from "framer-motion";

const WhyChoosUs = () => {
  return (
    <section className="bg-gray-100 mt-10 rounded-2xl py-12 px-6 md:px-20">
    <motion.h2
      className="text-4xl text-center heading font-bold mb-12 text-blue-600"
      animate={{
        x: ['-20px', '20px', '-20px'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
        Why Book With Us?
    </motion.h2>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
         <div className='flex justify-center'>
             <img
            src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
            alt="Secure Booking"
            className="w-16  h-16 mb-4"
          />
         </div>
          <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
          <p className="text-gray-600">
            We ensure your data and transactions are fully encrypted and protected with industry-grade security.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className='flex justify-center'>
<img
            src="https://cdn-icons-png.flaticon.com/512/3565/3565418.png"
            alt="Best Price"
            className="w-16 h-16 mb-4"
          />
          </div>
          <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
          <p className="text-gray-600">
            We offer the most competitive prices with exclusive discounts on selected rooms and services.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className='flex justify-center'>
<img
            src="https://cdn-icons-png.flaticon.com/512/4774/4774696.png"
            alt="24/7 Support"
            className="w-16 h-16 mb-4"
          /><img
            src="https://cdn-icons-png.flaticon.com/512/4774/4774696.png"
            alt="24/7 Support"
            className="w-16 h-16 mb-4"
          />
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
          <p className="text-gray-600">
            Our support team is available around the clock to assist you with any issues or inquiries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoosUs;
