import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#8B4513] text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Logo & Deskripsi */}
        <div>
          <h2 className="text-xl font-semibold mb-3 font-serif">Holland Bakery</h2>
          <p className="text-gray-100">
            Menyediakan roti dan kue berkualitas sejak 1978. Kami hadir untuk menemani setiap momen spesial Anda.
          </p>
        </div>

        {/* Link Navigasi */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigasi</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/produk" className="hover:underline">Menu</Link></li>
            <li><Link to="/about" className="hover:underline">Tentang Kami</Link></li>
            <li><Link to="/contact" className="hover:underline">Kontak</Link></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Bantuan</h3>
          <ul className="space-y-1">
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link to="/terms" className="hover:underline text-sm">Syarat & Ketentuan</Link></li>
            <li><Link to="/privacy" className="hover:underline">Kebijakan Privasi</Link></li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Ikuti Kami</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#D2B48C]">
              <Facebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#D2B48C]">
              <Instagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#D2B48C]">
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-300 mt-10 border-t border-[#A0522D] pt-4">
        &copy; {new Date().getFullYear()} Holland Bakery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
