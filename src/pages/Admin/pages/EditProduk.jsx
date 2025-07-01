import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProdukList,
  getProdukById,
  updateProduk,
  deleteProdukById,
  addProduk,
} from "../../../utils/productStorage";

export default function EditProduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
    gambar: "",
    kategori: "",
  });

  useEffect(() => {
    const produk = getProdukById(id);
    if (produk) setForm(produk);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar" && files.length > 0) {
      const imagePath = `/img/${files[0].name}`;
      setForm({ ...form, gambar: imagePath });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduk(id, {
      ...form,
      harga: Number(form.harga),
    });
    navigate("/admin/produk");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input type="text" name="nama" value={form.nama} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="harga" value={form.harga} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="kategori" value={form.kategori} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">-- Pilih Kategori --</option>
          <option value="Breads">Breads</option>
          <option value="Kue Traditional">Traditional</option>
          <option value="Donuts">Donuts</option>
          <option value="Pudding">Pudding</option>
          <option value="Tart">Tart</option>
          <option value="Cookies">Cookies</option>
        </select>
        <input type="file" name="gambar" accept="image/*" onChange={handleChange} className="w-full" />
        {form.gambar && (
          <img src={form.gambar} alt="Preview" className="w-24 mt-2 rounded" />
        )}
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
