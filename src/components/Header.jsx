import { useContext, useEffect, useState } from "react";
import { Search, User, ShoppingCart, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.length;
  const navigate = useNavigate();

  const [loyalitas, setLoyalitas] = useState("Belum Ada");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isLoggedIn = !!currentUser;
  const isPelanggan = currentUser?.role === "pelanggan";

  useEffect(() => {
    if (isPelanggan) {
      const pelangganList = JSON.parse(localStorage.getItem("pelangganList")) || [];
      const dataUser = pelangganList.find(p => p.email === currentUser.email);
      if (dataUser?.loyalitasManual) {
        setLoyalitas(dataUser.loyalitasManual);
      } else {
        setLoyalitas("Belum Ada");
      }
    }
  }, [isPelanggan, currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b sticky top-0 z-10">
      {/* Logo dan Navigasi */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/img/holland.jpg"
            alt="Holland Bakery Logo"
            className="w-24 h-12 object-contain"
          />
        </Link>

        <nav className="flex gap-6 text-sm text-[#8B4513] font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/Produk" className="hover:underline">Menu</Link>
          <Link to="/faq" className="hover:underline">FAQ</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </nav>
      </div>

      {/* Kanan: Cart & Pelanggan Info (jika role pelanggan) */}
      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative text-[#8B4513] hover:text-[#A0522D] transition">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {/* ✅ Tampilkan info pelanggan saja */}
        {isLoggedIn && isPelanggan ? (
          <div className="flex items-center gap-4 text-sm text-[#8B4513]">
            <div className="text-right hidden sm:block">
              <div className="font-medium">{currentUser.nama}</div>
              <div className="text-xs italic text-gray-500">{loyalitas}</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-2 py-1 border border-[#8B4513] text-[#8B4513] rounded-md hover:bg-[#8B4513] hover:text-white transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        ) : (
          !isLoggedIn && (
            <Link to="/login">
              <div className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#8B4513] transition">
                <div className="w-8 h-8 rounded-full bg-[#D2B48C] text-[#8B4513] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden sm:inline-block font-medium">Login</span>
              </div>
            </Link>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
