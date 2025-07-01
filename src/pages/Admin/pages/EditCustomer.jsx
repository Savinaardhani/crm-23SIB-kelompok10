import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditPelanggan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pelangganList")) || [];
    const target = data.find((p) => p.id === Number(id));
    if (!target) {
      Swal.fire("Gagal", "Data pelanggan tidak ditemukan", "error").then(() =>
        navigate("/admin/customer")
      );
    } else {
      setForm(target);
    }
  }, [id, navigate]);

  const validateTelepon = (nomor) => /^\+62\d{8,15}$/.test(nomor);
  const validateUsia = (tanggalLahir) => {
    const today = new Date();
    const birthDate = new Date(tanggalLahir);
    const usia = today.getFullYear() - birthDate.getFullYear();
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

    const existing = JSON.parse(localStorage.getItem("pelangganList")) || [];
    const updated = existing.map((p) =>
      p.id === Number(id) ? { ...p, ...form, totalBelanja: Number(form.totalBelanja) } : p
    );

    localStorage.setItem("pelangganList", JSON.stringify(updated));

    Swal.fire("Berhasil", "Data pelanggan berhasil diperbarui", "success").then(() =>
      navigate("/admin/customer")
    );
  };

  if (!form) return null;

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-700">✏️ Edit Pelanggan</h2>
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
          <option value="Kue Traditional">Traditional</option>
          <option value="Donuts">Donuts</option>
          <option value="Pudding">Pudding</option>
          <option value="Tart">Tart</option>
          <option value="Cookies">Cookies</option>
        </select>
        <input
          type="number"
          name="totalBelanja"
          placeholder="Total Belanja"
          value={form.totalBelanja}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
