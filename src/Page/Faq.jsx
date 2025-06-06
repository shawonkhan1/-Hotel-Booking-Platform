import React, { useEffect, useState } from 'react';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch('/Faq.json')
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error("Error loading FAQ data:", err));
  }, []);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left px-6 py-4 bg-white hover:bg-gray-50 flex justify-between items-center"
            >
              <span className="font-medium text-lg text-gray-800">{faq.question}</span>
              <span className="text-xl text-indigo-500">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
