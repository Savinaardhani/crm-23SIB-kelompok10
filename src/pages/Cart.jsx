import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreditCard, Wallet2, Banknote, Truck } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warn("Keranjang masih kosong!", {
        position: "top-right",
      });
      return;
    }

    if (!selectedPayment) {
      toast.warn("Silakan pilih metode pembayaran terlebih dahulu.", {
        position: "top-right",
      });
      return;
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (!isLoggedIn) {
  toast.info("Silakan daftar terlebih dahulu sebelum melanjutkan pembayaran.", {
    position: "top-right",
  });

  setTimeout(() => {
    navigate("/customerregister");
  }, 1000);

  return;
}

    toast.success(`Pembayaran via ${selectedPayment} diproses 🎉`, {
      position: "top-right",
    });

    setTimeout(() => {
      navigate("/pembayaran");
    }, 1000);
  };

  const paymentOptions = [
    { id: "e-wallet", name: "E-Wallet", icon: <Wallet2 className="w-5 h-5" /> },
    { id: "transfer", name: "Transfer Bank", icon: <CreditCard className="w-5 h-5" /> },
    { id: "cod", name: "Cash on Delivery", icon: <Truck className="w-5 h-5" /> },
    { id: "tunai", name: "Tunai di Toko", icon: <Banknote className="w-5 h-5" /> },
  ];

  return (
    <section className="px-6 py-10 min-h-screen bg-[#fffaf5]">
      <ToastContainer />

      <h2 className="text-3xl font-bold mb-8 text-[#8B4513] text-center font-serif">
        🛒 Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 italic text-center">Keranjang masih kosong.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* List Produk */}
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

          {/* Metode Pembayaran */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#8B4513]">
              Pilih Metode Pembayaran:
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2">
              {paymentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedPayment(option.name)}
                  className={`flex items-center gap-3 border rounded-lg p-3 transition ${
                    selectedPayment === option.name
                      ? "border-[#8B4513] bg-[#FBEEDC]"
                      : "border-gray-300 bg-white"
                  } hover:shadow-md`}
                >
                  {option.icon}
                  <span className="text-sm font-medium text-[#5C4033]">{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Total & Checkout */}
          <div className="border-t pt-6 text-right">
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
