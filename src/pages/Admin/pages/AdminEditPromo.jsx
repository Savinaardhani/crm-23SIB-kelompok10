import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditPromo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    tipe: "",
    nilai: "",
    tanggalMulai: "",
    tanggalBerakhir: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("promoList")) || [];
    const found = data.find((p) => p.id === Number(id));
    if (found) {
      setForm({
        nama: found.nama,
        deskripsi: found.deskripsi,
        tipe: found.tipe,
        nilai: found.nilai || "",
        tanggalMulai: found.tanggalMulai,
        tanggalBerakhir: found.tanggalBerakhir,
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = JSON.parse(localStorage.getItem("promoList")) || [];

    const status =
      new Date(form.tanggalBerakhir) >= new Date() ? "Aktif" : "Tidak Aktif";

    const updated = updatedData.map((promo) =>
      promo.id === Number(id)
        ? {
            ...promo,
            nama: form.nama,
            deskripsi: form.deskripsi,
            tipe: form.tipe,
            nilai: form.tipe === "Gratis Ongkir" ? null : Number(form.nilai),
            tanggalMulai: form.tanggalMulai,
            tanggalBerakhir: form.tanggalBerakhir,
            status,
          }
        : promo
    );

    localStorage.setItem("promoList", JSON.stringify(updated));
    navigate("/admin/promo");
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">✏️ Edit Promo</h2>
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
              : "Tidak perlu diisi"
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
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default AdminEditPromo;
