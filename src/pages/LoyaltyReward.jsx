import React, { useEffect, useState } from "react";

const rewardsList = [
  { id: 1, name: "Kupon Diskon 10%", pointsRequired: 100, description: "Dapatkan potongan 10% untuk pembelian berikutnya" },
  { id: 2, name: "Gratis Minuman", pointsRequired: 250, description: "Tukar poin untuk mendapatkan minuman gratis" },
  { id: 3, name: "Gratis Roti", pointsRequired: 500, description: "Tukar poin untuk mendapatkan roti gratis" },
  { id: 4, name: "Voucher Rp50.000", pointsRequired: 1000, description: "Voucher belanja senilai Rp50.000" },
];

const LoyaltyReward = () => {
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Ambil poin dari localStorage
    const savedPoints = parseInt(localStorage.getItem("userPoints") || "0", 10);
    setPoints(savedPoints);

    // Cek apakah user sudah submit feedback dan belum ditampilkan notifnya
    const hasSubmittedFeedback = localStorage.getItem("hasSubmittedFeedback") === "true";
    const feedbackNotifShown = localStorage.getItem("feedbackNotificationShown") === "true";

    if (hasSubmittedFeedback && !feedbackNotifShown) {
      setMessage("🎉 Kamu sudah mengisi feedback dan mendapatkan 5 poin!");
      setShowNotification(true);
      localStorage.setItem("feedbackNotificationShown", "true");

      // Hilangkan notif setelah 4 detik
      setTimeout(() => {
        setShowNotification(false);
        setMessage("");
      }, 4000);
    }
  }, []);

  const handleRedeem = (reward) => {
    if (points >= reward.pointsRequired) {
      const newPoints = points - reward.pointsRequired;
      setPoints(newPoints);
      localStorage.setItem("userPoints", newPoints.toString());

      setMessage(`🎉 Selamat! Kamu berhasil menukar ${reward.name}.`);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        setMessage("");
      }, 4000);
    } else {
      setMessage(`⚠️ Maaf, poin kamu belum cukup untuk menukar ${reward.name}.`);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        setMessage("");
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-16">
      {/* Notifikasi fixed di atas layar */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg select-none animate-fade-in-out">
          {message}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-purple-600 mb-6 text-center select-none">
          🎁 Loyalty Rewards
        </h1>

        <div className="bg-purple-100 border-l-4 border-purple-400 text-purple-700 p-4 rounded-md mb-8">
          <p className="text-center font-semibold text-lg">
            Poin Kamu Saat Ini: <span className="text-purple-700 text-2xl">{points}</span>
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-purple-600 mb-4 select-none">
            Daftar Reward yang Bisa Ditukar
          </h2>
          <ul className="space-y-6 max-h-96 overflow-y-auto pr-4">
            {rewardsList.map((reward) => (
              <li
                key={reward.id}
                className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-purple-700">{reward.name}</h3>
                  <p className="text-gray-600">{reward.description}</p>
                  <p className="mt-1 text-sm font-semibold text-purple-600">
                    Butuh Poin: {reward.pointsRequired}
                  </p>
                </div>
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={points < reward.pointsRequired}
                  className={`mt-4 md:mt-0 px-6 py-2 rounded-full font-semibold text-white transition-colors duration-300 ${
                    points >= reward.pointsRequired
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Tukar Reward
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Animasi fade in/out dengan TailwindCSS custom */}
      <style>{`
        @keyframes fade-in-out {
          0%, 100% { opacity: 0; transform: translateY(-10px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 4s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default LoyaltyReward;
