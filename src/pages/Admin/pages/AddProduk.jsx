import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduk } from "../../../utils/productStorage";
import { getKategoriList } from "../../../utils/kategoriStorage";

export default function AddProduk() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
    gambar: "",
    kategori: "",
  });

  const [preview, setPreview] = useState("");
  const [kategoriList, setKategoriList] = useState([]);

  useEffect(() => {
    const kategori = getKategoriList();
    setKategoriList(kategori);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "gambarFile" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setForm({
          ...form,
          gambar: reader.result, // simpan base64
        });
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const produkBaru = {
      id: Date.now(),
      ...form,
      harga: Number(form.harga),
    };

    addProduk(produkBaru);
    navigate("/admin/produk");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tambah Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="nama"
          placeholder="Nama Produk"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="harga"
          placeholder="Harga"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="deskripsi"
          placeholder="Deskripsi"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="kategori"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">-- Pilih Kategori --</option>
          {kategoriList.map((kategori, idx) => (
            <option key={idx} value={kategori}>
              {kategori}
            </option>
          ))}
        </select>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-auto object-cover border rounded"
          />
        )}

        <label className="block text-sm font-medium text-gray-700">
          Pilih Gambar dari File Explorer
        </label>
        <input
          type="file"
          name="gambarFile"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
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
