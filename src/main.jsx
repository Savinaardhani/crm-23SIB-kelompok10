// ✅ Inisialisasi kategori default (sekali saja di awal)
if (!localStorage.getItem("kategoriList")) {
  localStorage.setItem(
    "kategoriList",
    JSON.stringify([
      "Breads",
      "Kue Traditional",
      "Donuts",
      "Pudding",
      "Tart",
      "Cookies",
    ])
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// === ADMIN ===
import AdminLayout from "./pages/Admin/layouts/MainLayout";
import Dashboard from "./pages/Admin/pages/Dashboard";
import Produk from "./pages/Admin/pages/Produk";
import AddProduk from "./pages/Admin/pages/AddProduk";
import EditProduk from "./pages/Admin/pages/EditProduk";
import Order from "./pages/Admin/pages/Order";
import Customer from "./pages/Admin/pages/Customer";
import TambahPelanggan from "./pages/Admin/pages/TambahPelanggan";
import EditPelanggan from "./pages/Admin/pages/EditCustomer";
import AdminPromoList from "./pages/Admin/pages/AdminPromoList";
import AdminTambahPromo from "./pages/Admin/pages/AdminTambahPromo";
import AdminEditPromo from "./pages/Admin/pages/AdminEditPromo";
import AdminFAQList from "./pages/Admin/pages/AdminFAQList";
import AdminTambahFAQ from "./pages/Admin/pages/AdminTambahFAQ";
import AdminEditFAQ from "./pages/Admin/pages/AdminEditFAQ";
import KritikSaran from "./pages/Admin/pages/KritikSaran";

// === USER ===
import AppUser from "./pages/Pelanggan/App";

import "./assets/tailwind.css";



const App = () => (
  <Router>
    <Routes>
      {/* Route Admin */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="produk" element={<Produk />} />
        <Route path="produk/tambah" element={<AddProduk />} />
        <Route path="produk/edit/:id" element={<EditProduk />} />
        <Route path="order" element={<Order />} />
        <Route path="customer" element={<Customer />} />
        <Route path="customer/tambah" element={<TambahPelanggan />} />
        <Route path="customer/edit/:id" element={<EditPelanggan />} />
        <Route path="promo" element={<AdminPromoList />} />
        <Route path="promo/tambah" element={<AdminTambahPromo />} />
        <Route path="promo/edit/:id" element={<AdminEditPromo />} />
        <Route path="faq" element={<AdminFAQList />} />
        <Route path="faq/tambah" element={<AdminTambahFAQ />} />
        <Route path="faq/edit/:id" element={<AdminEditFAQ />} />
        <Route path="kritik" element={<KritikSaran />} />
      </Route>

      {/* Route Pelanggan */}
      <Route path="/*" element={<AppUser />} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
