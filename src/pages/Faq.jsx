import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "Apa itu Holland Bakery?",
    answer:
      "Holland Bakery adalah toko roti yang menyediakan berbagai pilihan roti, kue, dan makanan tradisional dengan kualitas terbaik sejak 1978.",
  },
  {
    question: "Apakah Holland Bakery menerima pesanan custom cake?",
    answer:
      "Ya, kami menerima pesanan custom cake untuk berbagai acara seperti ulang tahun, pernikahan, dan perayaan lainnya. Silakan hubungi kami minimal 3 hari sebelumnya.",
  },
  {
    question: "Apakah produk Holland Bakery halal?",
    answer:
      "Ya, semua produk Holland Bakery telah bersertifikat halal dari MUI.",
  },
  {
    question: "Apakah saya bisa memesan secara online?",
    answer:
      "Tentu! Anda dapat memesan melalui website kami atau aplikasi resmi Holland Bakery.",
  },
  {
    question: "Berapa lama waktu pengiriman pesanan online?",
    answer:
      "Waktu pengiriman tergantung lokasi Anda, umumnya berkisar antara 30–90 menit.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

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

      <div className="space-y-5">
        {faqData.map((item, index) => (
          <div
            key={index}
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
    </section>
  );
};

export default FAQ;
