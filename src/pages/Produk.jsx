import { useState, useContext } from "react"; 
import { CartContext } from "../context/CartContext"; 

const categories = ["Breads", "Traditional", "Donuts", "Pudding", "Tart", "Cookies"];

const produkData = {
  Breads: [
    { name: "Roti Coklat", price: 12000, image: "/img/roticoklat.jpg" },
    { name: "Roti Bakso Ayam", price: 13000, image: "/img/baksoayam.jpeg" },
    { name: "Roti Sosis", price: 14000, image: "/img/rotisosis.jpg" },
    { name: "Cheese Raisin", price: 15000, image: "/img/cheseeraisin.jpg" },
    { name: "Croissant", price: 16000, image: "/img/croissant.jpg" },
    { name: "Garlic Bread", price: 17000, image: "/img/garlic.jpeg" },
  ],
  Traditional: [
    { name: "Lemper Ayam", price: 8000, image: "/img/lemperayam.jpg" },
    { name: "Onde-Onde", price: 7000, image: "/img/ondeonde.jpeg" },
    { name: "Pastel Ayam", price: 10000, image: "/img/pastelayam.jpg" },
    { name: "Pastel Sapi", price: 11000, image: "/img/pastelsapi.jpg" },
    { name: "Risol Ayam", price: 9000, image: "/img/risolayam.jpg" },
    { name: "Bika Ambon", price: 12000, image: "/img/bikaambon.jpg" },
  ],
  Donuts: [
    { name: "Donut Gula", price: 6000, image: "/img/donutgula.jpg" },
    { name: "Donut Holland", price: 8000, image: "/img/donutholland.jpg" },
    { name: "Donut Mini", price: 4000, image: "/img/donutmini.jpg" },
    { name: "Cheese John", price: 11000, image: "/img/cheesejohn.jpg" },
    { name: "Chocolate John", price: 11000, image: "/img/chocolatejohn.jpg" },
    { name: "Nut John", price: 11000, image: "/img/nutjohn.jpg" },
  ],
  Pudding: [],
  Tart: [],
  Cookies: [],
};

const Produk = () => {
  const [activeCategory, setActiveCategory] = useState("Breads");
  const { addToCart } = useContext(CartContext);
  const { cart, removeFromCart } = useContext(CartContext); // ⬅️ pakai fungsi addToCart dari context

  return (
    <section className="px-6 py-10 text-center">
      <h2 className="text-3xl font-semibold mb-6 font-serif text-[#8B4513]">Explore More</h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-8 text-sm font-medium border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`pb-2 transition ${
              activeCategory === category
                ? "text-[#8B4513] border-b-2 border-[#8B4513]"
                : "text-gray-500 hover:text-[#8B4513]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produkData[activeCategory]?.length ? (
          produkData[activeCategory].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col items-center text-left"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg object-cover w-full h-48 mb-4"
              />
              <h3 className="text-lg font-semibold text-[#8B4513]">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-3">Rp {item.price.toLocaleString()}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-auto px-4 py-2 bg-[#8B4513] text-white rounded-full text-sm hover:bg-[#A0522D] transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-400 italic">No items available.</p>
        )}
      </div>
    </section>
  );
};

export default Produk;
