import { useState, useEffect } from "react";

export default function Order() {
  const initialPesanan = [
    {
      id: 1,
      nama: "Rayhan Zacky",
      produk: "Roti Coklat",
      total: 25000,
      status: "Diproses",
      metode: "Transfer Bank",
      deskripsi: "Tanpa topping, tolong cepat kirim ya.",
      tanggal: "2025-07-01",
    },
    {
      id: 2,
      nama: "Nindy Putri",
      produk: "Kue Keju",
      total: 18000,
      status: "Selesai",
      metode: "COD",
      deskripsi: "Dikirim ke rumah nenek.",
      tanggal: "2025-06-25",
    },
    {
      id: 3,
      nama: "Budi",
      produk: "Bolu Panggang",
      total: 30000,
      status: "Dibatalkan",
      metode: "E-Wallet",
      deskripsi: "Ganti alamat kirim mendadak.",
      tanggal: "2025-06-15",
    },
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [pesanan, setPesanan] = useState(() => {
    const saved = localStorage.getItem("orderList");
    return saved ? JSON.parse(saved) : initialPesanan;
  });

  useEffect(() => {
    localStorage.setItem("orderList", JSON.stringify(pesanan));
  }, [pesanan]);

  const openModal = (pesanan) => {
    setSelectedOrder(pesanan);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const handleFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus pesanan ini?");
    if (!confirmDelete) return;

    const updatedPesanan = pesanan.filter((p) => p.id !== id);
    setPesanan(updatedPesanan);
  };

  const handleChangeStatusInline = (id, newStatus) => {
    const updatedPesanan = pesanan.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setPesanan(updatedPesanan);
  };

  const handleChangeTanggalInline = (id, newTanggal) => {
    const updatedPesanan = pesanan.map((p) =>
      p.id === id ? { ...p, tanggal: newTanggal } : p
    );
    setPesanan(updatedPesanan);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Diproses":
        return "#eab308";
      case "Selesai":
        return "#16a34a";
      case "Dibatalkan":
        return "#ef4444";
      default:
        return "#9ca3af";
    }
  };

  const getStatusBadge = (status) => {
    let base = "text-white px-2 py-1 text-xs rounded-full";
    switch (status) {
      case "Diproses":
        return `${base} bg-yellow-500`;
      case "Selesai":
        return `${base} bg-green-600`;
      case "Dibatalkan":
        return `${base} bg-red-500`;
      default:
        return `${base} bg-gray-400`;
    }
  };

  const filteredData = filterStatus
    ? pesanan.filter((p) => p.status === filterStatus)
    : pesanan;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-700">🧾 Daftar Pesanan</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm">Filter Status:</label>
          <select
            onChange={handleFilter}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="">Semua</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-green-100 text-gray-800">
            <tr>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Produk</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Metode</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Tanggal</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((p) => (
              <tr key={p.id} className="text-center hover:bg-gray-50 border-t">
                <td className="p-2 border">{p.nama}</td>
                <td className="p-2 border">{p.produk}</td>
                <td className="p-2 border">
                  Rp {p.total.toLocaleString("id-ID")}
                </td>
                <td className="p-2 border">{p.metode}</td>
                <td className="p-2 border">
                  <select
                    value={p.status}
                    onChange={(e) =>
                      handleChangeStatusInline(p.id, e.target.value)
                    }
                    className="px-2 py-1 text-xs rounded font-medium border outline-none"
                    style={{
                      backgroundColor: getStatusColor(p.status),
                      color: "white",
                    }}
                  >
                    <option value="Diproses" className="text-black bg-white">
                      Diproses
                    </option>
                    <option value="Selesai" className="text-black bg-white">
                      Selesai
                    </option>
                    <option value="Dibatalkan" className="text-black bg-white">
                      Dibatalkan
                    </option>
                  </select>
                </td>
                <td className="p-2 border">
                  <input
                    type="date"
                    value={p.tanggal}
                    onChange={(e) =>
                      handleChangeTanggalInline(p.id, e.target.value)
                    }
                    className="text-sm border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => openModal(p)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Lihat Detail
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500 italic">
                  Tidak ada pesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Detail Pesanan</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Nama:</strong> {selectedOrder.nama}</p>
              <p><strong>Produk:</strong> {selectedOrder.produk}</p>
              <p><strong>Total:</strong> Rp {selectedOrder.total.toLocaleString("id-ID")}</p>
              <p><strong>Metode:</strong> {selectedOrder.metode}</p>
              <p><strong>Deskripsi:</strong> {selectedOrder.deskripsi}</p>
              <p><strong>Tanggal:</strong> {selectedOrder.tanggal}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={getStatusBadge(selectedOrder.status)}>
                  {selectedOrder.status}
                </span>
              </p>
            </div>
            <div className="mt-4 text-right space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
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
