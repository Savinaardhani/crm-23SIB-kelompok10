import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import MainLayoutAdmin from "./components/admin/MainLayoutAdmin";

import Dashboard from "./pages/Dashboard";
import Produk from "./pages/Produk";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import TermsAndConditions from "./pages/TermsAndConditions";
import LoginPage from "./pages/LoginPage";
import Pelanggan from "./components/admin/Pelanggan"; // ✅ sesuaikan dengan lokasi barumu
import DashboardAdmin from "./components/admin/DashboardAdmin";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>

        {/* User Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/pelanggan" element={<Pelanggan />} /> ⛔ PINDAH KE ADMIN */}
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<MainLayoutAdmin />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="pelanggan" element={<Pelanggan />} /> {/* ✅ Pelanggan sekarang pakai layout admin */}
        </Route>

      </Routes>
    </CartProvider>
  );
}

export default App;
