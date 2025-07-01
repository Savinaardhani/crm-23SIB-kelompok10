import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminTambahPromo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    tipe: "",
    nilai: "",
    tanggalMulai: "",
    tanggalBerakhir: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("promoList")) || [];

    const status =
      new Date(form.tanggalBerakhir) >= new Date() ? "Aktif" : "Tidak Aktif";

    const newData = {
      id: Date.now(),
      nama: form.nama,
      deskripsi: form.deskripsi,
      tipe: form.tipe,
      nilai: form.tipe === "Gratis Ongkir" ? null : Number(form.nilai),
      tanggalMulai: form.tanggalMulai,
      tanggalBerakhir: form.tanggalBerakhir,
      status,
    };

    localStorage.setItem("promoList", JSON.stringify([newData, ...existing]));

    Swal.fire("Sukses", "Promo berhasil ditambahkan", "success").then(() => {
      navigate("/admin/promo");
    });
  };

  return (
    <div className="p-6 max-w-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold mb-4">➕ Tambah Promo</h2>
      <button
          type="button"
          onClick={() => navigate("/admin/promo")}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          ← Kembali
        </button>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama Promo"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi Promo"
          required
          className="w-full border p-2 rounded"
        ></textarea>
        <select
          name="tipe"
          value={form.tipe}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">-- Pilih Tipe Promo --</option>
          <option value="Diskon">Diskon (%)</option>
          <option value="Cashback">Cashback (Rp)</option>
          <option value="Gratis Ongkir">Gratis Ongkir</option>
        </select>
        <input
          type="number"
          name="nilai"
          value={form.nilai}
          onChange={handleChange}
          placeholder={
            form.tipe === "Diskon"
              ? "Masukkan persen (contoh: 10)"
              : form.tipe === "Cashback"
              ? "Masukkan nominal (contoh: 10000)"
              : "Nominal Promo"
          }
          className="w-full border p-2 rounded"
          disabled={form.tipe === "Gratis Ongkir"}
          required={form.tipe !== "Gratis Ongkir"}
        />
        <input
          type="date"
          name="tanggalMulai"
          value={form.tanggalMulai}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="tanggalBerakhir"
          value={form.tanggalBerakhir}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
