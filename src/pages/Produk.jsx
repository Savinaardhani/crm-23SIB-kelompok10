import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const categories = ["Breads", "Traditional", "Donuts", "Pudding", "Tart", "Cookies"];

const produkData = {
  Breads: [
    { id: 1, name: "Roti Coklat", price: 12000, image: "/img/roticoklat.jpg", tag: "Best Seller" },
    { id: 2, name: "Roti Bakso Ayam", price: 13000, image: "/img/baksoayam.jpeg" },
    { id: 3, name: "Roti Sosis", price: 14000, image: "/img/rotisosis.jpg", tag: "Diskon" },
    { id: 4, name: "Cheese Raisin", price: 15000, image: "/img/cheseeraisin.jpg" },
    { id: 5, name: "Croissant", price: 16000, image: "/img/croissant.jpg", tag: "New" },
    { id: 6, name: "Garlic Bread", price: 17000, image: "/img/garlic.jpeg" },
  ],
  Traditional: [
    { id: 7, name: "Lemper Ayam", price: 8000, image: "/img/lemperayam.jpg" },
    { id: 8, name: "Onde-Onde", price: 7000, image: "/img/ondeonde.jpeg" },
    { id: 9, name: "Pastel Ayam", price: 10000, image: "/img/pastelayam.jpg" },
    { id: 10, name: "Pastel Sapi", price: 11000, image: "/img/pastelsapi.jpg" },
    { id: 11, name: "Risol Ayam", price: 9000, image: "/img/risolayam.jpg" },
    { id: 12, name: "Bika Ambon", price: 12000, image: "/img/bikaambon.jpg" },
  ],
  Donuts: [
    { id: 13, name: "Donut Gula", price: 6000, image: "/img/donutgula.jpg" },
    { id: 14, name: "Donut Holland", price: 8000, image: "/img/donutholland.jpg" },
    { id: 15, name: "Donut Mini", price: 4000, image: "/img/donutmini.jpg" },
    { id: 16, name: "Cheese John", price: 11000, image: "/img/cheesejohn.jpg" },
    { id: 17, name: "Chocolate John", price: 11000, image: "/img/chocolatejohn.jpg" },
    { id: 18, name: "Nut John", price: 11000, image: "/img/nutjohn.jpg" },
  ],
  Pudding: [],
  Tart: [],
  Cookies: [],
};

const Produk = () => {
  const [activeCategory, setActiveCategory] = useState("Breads");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart } = useContext(CartContext);

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto text-center">
      <div className="mb-10">
        <h2 className="text-4xl font-bold font-serif text-[#8B4513] tracking-wide mb-2">Our Special Menu</h2>
        <p className="text-sm text-gray-500">Temukan pilihan roti dan kue terbaik dari kami</p>
      </div>

      <input
        type="text"
        placeholder="Cari produk..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-8 w-full max-w-md mx-auto px-4 py-3 border border-gray-300 rounded-full shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
      />

      <div className="flex justify-center flex-wrap gap-4 mb-10 text-sm font-medium">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === category
                ? "bg-[#8B4513] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-[#e9d5c7]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {produkData[activeCategory]
          .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
            >
              {item.tag && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase">
                  {item.tag}
                </span>
              )}
              <img
                src={item.image}
                alt={item.name}
                onClick={() => setSelectedItem(item)}
                className="object-cover w-full h-48 cursor-pointer hover:scale-105 transition-transform"
              />
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-[#8B4513] mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4">Rp {item.price.toLocaleString()}</p>
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

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md relative animate-fadeIn">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
            >
              ×
            </button>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-semibold text-[#8B4513] mb-2">{selectedItem.name}</h2>
            <p className="text-gray-600 mb-4">Harga: Rp {selectedItem.price.toLocaleString()}</p>
            <button
              onClick={() => {
                addToCart(selectedItem);
                setSelectedItem(null);
              }}
              className="w-full py-2 bg-[#8B4513] text-white rounded-full hover:bg-[#A0522D]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Produk;