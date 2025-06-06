import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/OurServices.json')  
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Failed to load services:', err));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Services</h2>
        <p className="mb-12 text-gray-600 max-w-2xl mx-auto">
          The best features we offer for your hotel booking experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {services.map(({ id, icon, title, description }) => {
            const IconComponent = FaIcons[icon] || FaIcons.FaStar;

            return (
              <div
                key={id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4 text-indigo-600 text-5xl">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
