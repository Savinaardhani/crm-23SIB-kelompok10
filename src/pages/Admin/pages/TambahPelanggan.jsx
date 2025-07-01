import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TambahPelanggan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    tanggalLahir: "",
    preferensi: "",
    totalBelanja: "",
  });

  const validateTelepon = (nomor) => {
    return /^\+62\d{8,15}$/.test(nomor);
  };

  const validateUsia = (tanggalLahir) => {
    const today = new Date();
    const birthDate = new Date(tanggalLahir);
    const usia = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return usia - 1 >= 13;
    }
    return usia >= 13;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTelepon(form.telepon)) {
      return Swal.fire("Error", "Nomor telepon harus dimulai dengan +62", "error");
    }

    if (!validateUsia(form.tanggalLahir)) {
      return Swal.fire("Error", "Usia minimal 13 tahun", "error");
    }

    if (Number(form.totalBelanja) <= 0 || isNaN(Number(form.totalBelanja))) {
      return Swal.fire("Error", "Total belanja harus berupa angka dan lebih dari 0", "error");
    }

    const existing = JSON.parse(localStorage.getItem("pelangganList")) || [];

    const newData = {
      ...form,
      id: Date.now(),
      role: "pelanggan",
      loyalitasManual: null,
      totalBelanja: Number(form.totalBelanja),
    };

    localStorage.setItem("pelangganList", JSON.stringify([...existing, newData]));

    Swal.fire("Sukses", "Data pelanggan berhasil ditambahkan", "success").then(() =>
      navigate("/admin/customer")
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">➕ Tambah Pelanggan</h2>
        <button
          type="button"
          onClick={() => navigate("/admin/customer")}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          ← Kembali
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nama"
          placeholder="Nama lengkap"
          value={form.nama}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="telepon"
          placeholder="Contoh: +628123456789"
          value={form.telepon}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="alamat"
          placeholder="Alamat"
          value={form.alamat}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="tanggalLahir"
          value={form.tanggalLahir}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="preferensi"
          value={form.preferensi}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">-- Pilih Preferensi --</option>
          <option value="Breads">Breads</option>
          <option value="Kue Traditional">Kue Traditional</option>
          <option value="Donuts">Donuts</option>
          <option value="Pudding">Pudding</option>
          <option value="Tart">Tart</option>
          <option value="Cookies">Cookies</option>
        </select>
        <input
          type="number"
          name="totalBelanja"
          placeholder="Total Belanja (Rp)"
          value={form.totalBelanja}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
