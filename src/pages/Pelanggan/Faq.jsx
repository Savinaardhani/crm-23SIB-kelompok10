import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("faqList"));
      if (Array.isArray(saved)) {
        setFaqData(saved);
      }
    } catch (e) {
      console.error("Gagal membaca FAQ dari localStorage", e);
    }
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 font-sans">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-[#8B4513] mb-4 font-serif">
          Pertanyaan yang Sering Ditanyakan
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-base">
          Temukan jawaban seputar layanan, produk, dan informasi penting lainnya dari Holland Bakery.
        </p>
      </div>

      {faqData.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          Belum ada pertanyaan yang tersedia saat ini.
        </p>
      ) : (
        <div className="space-y-5">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className="border border-[#dcb88b] rounded-xl bg-white shadow transition-all"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-[#FFF6E5] transition duration-300"
              >
                <div className="flex items-center gap-3 text-[#8B4513] font-semibold text-lg">
                  <HelpCircle className="w-5 h-5 text-[#d4a373]" />
                  {item.question}
                </div>
                {openIndex === index ? (
                  <ChevronUp className="text-[#8B4513]" />
                ) : (
                  <ChevronDown className="text-[#8B4513]" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-sm text-gray-700 leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FAQ;
