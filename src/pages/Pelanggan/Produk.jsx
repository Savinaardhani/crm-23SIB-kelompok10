import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function Produk() {
  const [produkList, setProdukList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Breads");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const savedProduk = JSON.parse(localStorage.getItem("produkList")) || [];
    setProdukList(savedProduk);
  }, []);

  const filteredProduk = produkList.filter(
    (item) =>
      item.kategori === activeCategory &&
      item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    "Breads",
    "Kue Traditional",
    "Donuts",
    "Pudding",
    "Tart",
    "Cookies",
  ];

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🍞 Katalog Produk</h1>

      {/* Filter Kategori */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm ${
              activeCategory === category
                ? "bg-[#8B4513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded-full w-full max-w-md"
      />

      {/* Produk Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProduk.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
          >
            <img
              src={item.gambar} // base64 string
              alt={item.nama}
              className="object-cover w-full h-48 cursor-pointer hover:scale-105 transition-transform"
            />
            <div className="p-4 text-left">
              <h3 className="text-lg font-semibold text-[#8B4513] mb-1">
                {item.nama}
              </h3>

              <p className="text-gray-600 text-sm mb-2">{item.deskripsi}</p>

              <p className="text-[#8B4513] text-lg font-semibold mb-4">
                Rp {item.harga.toLocaleString("id-ID")}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="w-full py-2 bg-[#8B4513] text-white rounded-full text-sm hover:bg-[#A0522D] transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Jika tidak ada produk */}
      {filteredProduk.length === 0 && (
        <p className="text-gray-400 italic mt-6">Tidak ada produk ditemukan.</p>
      )}
    </section>
  );
}
