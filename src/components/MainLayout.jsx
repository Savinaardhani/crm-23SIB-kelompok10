import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"; // ✅ Tambahkan ini

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen w-full flex flex-col">
      {/* Header tetap */}
      <Header />

      {/* Konten utama */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Footer tampil di semua halaman */}
      <Footer /> {/* ✅ Tambahkan ini */}
    </div>
  );
}
