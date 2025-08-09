import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaHandshake, FaHotel, FaUsers } from "react-icons/fa";
import Loading from "../Components/Loading";

const iconMap = {
  FaBullseye: FaBullseye,
  FaHandshake: FaHandshake,
  FaHotel: FaHotel,
  FaUsers: FaUsers,
};

const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/About.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to fetch about.json:", err));
  }, []);

  if (!data) {
    return   <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-700"></div>
    </div>
  }
 

  const { header, cards, footer } = data;

  return (
    <section className="bg-base-100 py-10 px-4 lg:px-24">
      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-blue-600  mb-8">{header.title}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          {header.description}
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {cards.map((card, i) => {
          const Icon = iconMap[card.icon];
          return (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 + card.delay, delay: card.delay }}
            >
              <Icon className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: footer.delay }}
      >
        {React.createElement(iconMap[footer.icon], {
          className: "text-5xl text-primary mx-auto mb-4",
        })}
        <h4 className="text-2xl font-bold text-primary mb-3">{footer.title}</h4>
        <p className="text-gray-500 text-md max-w-2xl mx-auto">
          {footer.description}
        </p>
      </motion.div>
    </section>
  );
};

export default About;
