import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaBoxOpen, FaUserFriends, FaFileInvoice, FaGift } from "react-icons/fa";
import { BiCartAlt } from "react-icons/bi";
import { MdFeedback } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";

export default function Sidebar() {
  const navigate = useNavigate();

  const linkClass =
    "flex items-center px-4 py-2 rounded-md hover:bg-green-100 transition-all";
  const activeClass = "bg-green-200 font-semibold text-green-800";

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // Bersihkan login
    navigate("/"); // Redirect ke halaman utama (bisa ganti ke "/login" jika perlu)
  };

  return (
    <div className="w-64 bg-white shadow-md min-h-screen px-4 py-6">
      <h2 className="text-2xl font-bold mb-8 text-green-700">
        Holland Bakery
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <MdDashboard className="mr-3 text-xl" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/order"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <BiCartAlt className="mr-3 text-xl" />
          Order
        </NavLink>

        <NavLink
          to="/admin/customer"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaUserFriends className="mr-3 text-xl" />
          Pelanggan
        </NavLink>

        <NavLink
          to="/admin/produk"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaBoxOpen className="mr-3 text-xl" />
          Menu
        </NavLink>

        <NavLink
          to="/admin/promo"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaGift className="mr-3 text-xl" />
          Promo
        </NavLink>

        <NavLink
          to="/admin/faq"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <RiQuestionAnswerLine className="mr-3 text-xl" />
          FAQ
        </NavLink>

        {/* <NavLink
          to="/admin/invoice"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaFileInvoice className="mr-3 text-xl" />
          Invoice
        </NavLink> */}

        <NavLink
          to="/admin/kritik"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <MdFeedback className="mr-3 text-xl" />
          Kritik & Saran
        </NavLink>


        {/* 🔴 Tombol Logout (sebagai button) */}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 rounded-md text-red-500 hover:bg-red-100 mt-6 w-full"
        >
          <MdLogout className="mr-3 text-xl" />
          Logout
        </button>
      </nav>
    </div>
  );
}
