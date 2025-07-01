// src/pages/admin/KritikSaran.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function KritikSaran() {
  const [kritikList, setKritikList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("kritikSaranList")) || [];
    setKritikList(stored);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Kritik?",
      text: "Data tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = kritikList.filter((item) => item.id !== id);
        setKritikList(updated);
        localStorage.setItem("kritikSaranList", JSON.stringify(updated));
        Swal.fire("Dihapus!", "Kritik & saran berhasil dihapus.", "success");
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📬 Daftar Kritik & Saran</h2>
      {kritikList.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada kritik dan saran.</p>
      ) : (
        <div className="space-y-4">
          {kritikList.map((item) => (
            <div key={item.id} className="bg-white border rounded p-4 shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.email}</p>
                  <p className="text-gray-700">{item.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
