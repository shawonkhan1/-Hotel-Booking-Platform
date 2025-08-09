import React, { useEffect, useState } from 'react';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch('/Faq.json')
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error("Error loading FAQ data:", err));
  }, []);

  return (
    <section className="w-full  pt-1 pb-7 px-4 md:px-8 lg:px-16">
      <div className="max-w-6x mx-auto">
        <h2 className="text-4xl mt-6 font-bold heading font-bold text-center text-blue-600 mb-12 tracking-wide leading-tight drop-shadow-sm">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-white border border-base-300 shadow-md rounded-xl">
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              <div className="collapse-title heading font-semibold text-lg md:text-xl text-gray-800">
                {faq.question}
              </div>
              <div className="collapse-content description text-base text-gray-600">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
