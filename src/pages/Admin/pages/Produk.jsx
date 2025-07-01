import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getProdukList,
  deleteProdukById,
} from "../../../utils/productStorage";

export default function Produk() {
  const navigate = useNavigate();
  const [produkList, setProdukList] = useState([]);

  useEffect(() => {
    const list = getProdukList();
    setProdukList(list);
  }, []);

  const handleDelete = (id) => {
    const produk = produkList.find((p) => p.id === id);

    Swal.fire({
      title: `Hapus "${produk?.nama}"?`,
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProdukById(id);
        const updatedList = getProdukList();
        setProdukList(updatedList);

        Swal.fire({
          title: "Dihapus!",
          text: "Produk berhasil dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">📦 Manajemen Produk</h1>
        <button
          onClick={() => navigate("/admin/produk/tambah")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          + Tambah Produk
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-green-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border">Gambar</th>
              <th className="py-2 px-4 border">Nama Produk</th>
              <th className="py-2 px-4 border">Kategori</th>
              <th className="py-2 px-4 border">Harga</th>
              <th className="py-2 px-4 border">Deskripsi</th>
              <th className="py-2 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produkList.length > 0 ? (
              produkList.map((produk) => (
                <tr key={produk.id} className="text-center hover:bg-gray-50 border-t">
                  <td className="py-2 px-4 border">
                    <img
                      src={produk.gambar} // pakai base64 langsung
                      alt={produk.nama}
                      className="w-20 h-auto mx-auto rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border">{produk.nama}</td>
                  <td className="py-2 px-4 border">{produk.kategori || "-"}</td>
                  <td className="py-2 px-4 border">
                    Rp {Number(produk.harga).toLocaleString("id-ID")}
                  </td>
                  <td className="py-2 px-4 border">{produk.deskripsi}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => navigate(`/admin/produk/edit/${produk.id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded-md"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(produk.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-gray-500 italic">
                  Tidak ada produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
