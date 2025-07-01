import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function Pelanggan() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pelanggan, setPelanggan] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
      return;
    }

    const savedPelanggan = JSON.parse(localStorage.getItem("pelangganList")) || [];
    const orders = JSON.parse(localStorage.getItem("orderList")) || [];

    // Hitung total belanja dari pesanan yang tidak dibatalkan
    const updated = savedPelanggan.map((p) => {
      const totalBelanja = orders
        .filter((o) => o.nama === p.nama && o.status !== "Dibatalkan")
        .reduce((sum, o) => sum + o.total, 0);
      return { ...p, totalBelanja };
    });

    setPelanggan(updated);
    localStorage.setItem("pelangganList", JSON.stringify(updated));
  }, [location]);

  const getLoyalitas = (p) => {
    if (p.loyalitasManual) return p.loyalitasManual;
    const total = p.totalBelanja;
    if (total > 1000000) return "Platinum";
    if (total >= 500000) return "Gold";
    if (total >= 200000) return "Silver";
    return "Belum Ada";
  };

  const getColor = (level) => {
    switch (level) {
      case "Platinum": return "#1f2937";
      case "Gold": return "#eab308";
      case "Silver": return "#9ca3af";
      default: return "#fb923c";
    }
  };

  const handleDelete = (id) => {
    const item = pelanggan.find((p) => p.id === id);
    Swal.fire({
      title: `Hapus pelanggan "${item?.nama}"?`,
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = pelanggan.filter((p) => p.id !== id);
        setPelanggan(updated);
        localStorage.setItem("pelangganList", JSON.stringify(updated));
      }
    });
  };

  const handleChangeLoyalitas = (id, newLevel) => {
    const updated = pelanggan.map((p) =>
      p.id === id ? { ...p, loyalitasManual: newLevel } : p
    );
    setPelanggan(updated);
    localStorage.setItem("pelangganList", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">👤 Manajemen Pelanggan</h1>
        <button
          onClick={() => navigate("/admin/customer/tambah")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Tambah Data
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-green-100 text-gray-700">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Total Belanja</th>
              <th className="p-2 border">Loyalitas</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pelanggan.length > 0 ? (
              pelanggan.map((p, index) => {
                const loyal = getLoyalitas(p);
                const color = getColor(loyal);
                return (
                  <tr key={p.id} className="text-center hover:bg-gray-50 border-t">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{p.nama}</td>
                    <td className="p-2 border">{p.email}</td>
                    <td className="p-2 border">{p.role}</td>
                    <td className="p-2 border">
                      Rp {p.totalBelanja?.toLocaleString("id-ID") || 0}
                    </td>
                    <td className="p-2 border">
                      <select
                        value={loyal}
                        onChange={(e) => handleChangeLoyalitas(p.id, e.target.value)}
                        className="text-white text-xs px-2 py-1 rounded-full font-medium border outline-none"
                        style={{ backgroundColor: color }}
                      >
                        <option value="Silver" className="text-black bg-white">Silver</option>
                        <option value="Gold" className="text-black bg-white">Gold</option>
                        <option value="Platinum" className="text-black bg-white">Platinum</option>
                        <option value="Belum Ada" className="text-black bg-white">Belum Ada</option>
                      </select>
                    </td>
                    <td className="p-2 border space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedDetail(p)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => navigate(`/admin/customer/edit/${p.id}`)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500 italic">
                  Tidak ada data pelanggan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {selectedDetail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-lg">
            <button
              onClick={() => setSelectedDetail(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">👁️ Detail Pelanggan</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Nama:</strong> {selectedDetail.nama}</p>
              <p><strong>Email:</strong> {selectedDetail.email}</p>
              <p><strong>Telepon:</strong> {selectedDetail.telepon}</p>
              <p><strong>Alamat:</strong> {selectedDetail.alamat}</p>
              <p><strong>Tanggal Lahir:</strong> {selectedDetail.tanggalLahir}</p>
              <p><strong>Preferensi:</strong> {selectedDetail.preferensi}</p>
              <p><strong>Total Belanja:</strong> Rp {selectedDetail.totalBelanja?.toLocaleString("id-ID") || 0}</p>
              <p><strong>Loyalitas:</strong> {getLoyalitas(selectedDetail)}</p>
              <p><strong>Role:</strong> {selectedDetail.role}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedDetail(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
