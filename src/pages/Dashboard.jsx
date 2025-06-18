import React from "react";
import {
  Facebook,
  Instagram,
  Music2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
const Dashboard = () => {
  return (
    <section className="px-10 py-16 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#8B4513] leading-tight font-serif">
            Selamat Datang di Holland Bakery
          </h1>
          <p className="text-gray-700 text-base md:text-lg">
            Holland Bakery menyajikan roti dan kue lezat dengan kualitas terbaik sejak
            tahun 1978. Kami terus berinovasi menghadirkan rasa klasik dan modern yang
            cocok untuk semua kalangan. Holland Bakery, selalu menjadi pilihan terpercaya
            keluarga Indonesia.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-4 mt-4 text-[#8B4513]">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 hover:text-[#A0522D]" />
            </a>
            <a href="https://wa.me/6281371078227" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="w-5 h-5 hover:text-[#25D366]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-[#A0522D]" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <Music2 className="w-5 h-5 hover:text-[#A0522D]" />
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/img/roti.jpg"
            alt="Produk Holland Bakery"
            className="w-full max-w-sm rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;