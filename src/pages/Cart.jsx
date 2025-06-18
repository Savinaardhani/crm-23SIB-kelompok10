import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warn("Keranjang masih kosong!", {
        position: "top-right",
      });
      return;
    }

    toast.success("Berhasil menuju pembayaran 🎉", {
      position: "top-right",
    });

    // Tambahkan navigasi atau proses selanjutnya jika ada
  };

  return (
    <section className="px-6 py-10 min-h-screen bg-[#fffaf5]">
      <ToastContainer /> {/* ✅ Komponen untuk menampilkan notifikasi */}

      <h2 className="text-3xl font-bold mb-8 text-[#8B4513] text-center font-serif">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 italic text-center">Cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 gap-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#8B4513]">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">Rp {item.price.toLocaleString()}</p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="mt-10 border-t pt-6 text-right">
            <div className="text-xl font-bold text-[#8B4513] mb-4">
              Total: Rp {total.toLocaleString()}
            </div>
            <button
              onClick={handleCheckout}
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-8 py-3 rounded-full font-medium transition"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
