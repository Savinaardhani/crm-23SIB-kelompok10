import React, { useState } from "react";

const Produk = () => {
  const [produkList, setProdukList] = useState([
    {
      id: 1,
      nama: "Roti Tawar",
      gambar: "/img/roti-tawar.jpg",
      harga: "Rp 15.000",
      deskripsi: "Roti tawar lembut cocok untuk sarapan",
      stok: 20,
    },
    {
      id: 2,
      nama: "Donat Cokelat",
      gambar: "/img/donatcoklat.jpg",
      harga: "Rp 8.000",
      deskripsi: "Donat dengan lapisan cokelat manis",
      stok: 10,
    },
    {
      id: 3,
      nama: "Kue Lapis",
      gambar: "/img/kuelapis.jpg",
      harga: "Rp 12.000",
      deskripsi: "Kue lapis legit khas Indonesia",
      stok: 5,
    },
    {
      id: 4,
      nama: "Croissant",
      gambar: "/img/croissant.jpg",
      harga: "Rp 18.000",
      deskripsi: "Croissant lembut dan renyah",
      stok: 15,
    },
    {
      id: 5,
      nama: "Roti Cokelat",
      gambar: "/img/roticoklat.jpg",
      harga: "Rp 10.000",
      deskripsi: "Roti isi cokelat yang lezat dan manis",
      stok: 12,
    },
    {
      id: 6,
      nama: "Roti Sosis",
      gambar: "/img/rotisosis.jpg",
      harga: "Rp 11.000",
      deskripsi: "Roti isi sosis cocok untuk camilan gurih",
      stok: 9,
    },
  ]);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [stok, setStok] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState("");

  const handleTambahProduk = () => {
    if (!nama || !deskripsi || !stok || !harga || !gambar) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    const stokNum = parseInt(stok);
    if (isNaN(stokNum) || stokNum < 0) {
      alert("Stok harus berupa angka positif!");
      return;
    }

    const produkBaru = {
      id: produkList.length + 1,
      nama,
      deskripsi,
      stok: stokNum,
      gambar,
      harga: harga.startsWith("Rp") ? harga : `Rp ${harga}`,
    };

    setProdukList([...produkList, produkBaru]);

    // reset form
    setNama("");
    setDeskripsi("");
    setStok("");
    setHarga("");
    setGambar("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Daftar Produk</h1>

      {/* Form Tambah Produk */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-4">Tambah Produk Baru</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nama produk"
            className="border rounded px-3 py-2"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <input
            type="text"
            placeholder="Deskripsi produk"
            className="border rounded px-3 py-2"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stok produk"
            className="border rounded px-3 py-2"
            min="0"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
          />
          <input
            type="text"
            placeholder="Harga produk (contoh: 12000 atau Rp 12.000)"
            className="border rounded px-3 py-2"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link gambar produk (URL)"
            className="border rounded px-3 py-2"
            value={gambar}
            onChange={(e) => setGambar(e.target.value)}
          />
          <button
            onClick={handleTambahProduk}
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
          >
            Tambah Produk
          </button>
        </div>
      </div>

      {/* Daftar Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produkList.map((produk) => (
          <div
            key={produk.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={produk.gambar}
              alt={produk.nama}
              className="w-full h-40 object-cover rounded-md mb-4"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
              }}
            />
            <h2 className="text-lg font-semibold">{produk.nama}</h2>
            <p className="text-sm text-gray-600 mb-2">{produk.deskripsi}</p>
            <p className="text-purple-700 font-bold mb-1">{produk.harga}</p>
            <p
              className={`text-sm ${
                produk.stok > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Stok: {produk.stok}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produk;
