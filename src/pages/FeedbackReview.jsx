import React, { useEffect, useState } from "react";

const initialReviews = [
  {
    id: 1,
    name: "Rina",
    rating: 5,
    comment: "Pelayanan sangat memuaskan dan produk berkualitas!",
    date: "2025-05-20",
  },
  {
    id: 2,
    name: "Budi",
    rating: 4,
    comment: "Roti nya enak, cuma kadang stok cepat habis.",
    date: "2025-05-22",
  },
];

const stars = [1, 2, 3, 4, 5];

const FeedbackReview = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [points, setPoints] = useState(0);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");

  // Load points dan flag feedback dari localStorage
  useEffect(() => {
    const savedPoints = parseInt(localStorage.getItem("userPoints") || "0", 10);
    setPoints(savedPoints);

    const submittedFlag = localStorage.getItem("hasSubmittedFeedback") === "true";
    setHasSubmittedBefore(submittedFlag);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment || rating === 0) {
      alert("Mohon isi semua kolom dan berikan rating.");
      return;
    }
    const newReview = {
      id: reviews.length + 1,
      name,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setComment("");
    setRating(0);
    setSubmitted(true);

    // Berikan 5 poin jika ini pertama kali submit feedback
    if (!hasSubmittedBefore) {
      const newPoints = points + 5;
      setPoints(newPoints);
      localStorage.setItem("userPoints", newPoints.toString());
      localStorage.setItem("hasSubmittedFeedback", "true");
      setHasSubmittedBefore(true);
      setNotifMsg("🎉 Terima kasih sudah mengisi feedback! Kamu mendapatkan 5 poin.");
      // hilangkan notif setelah 3 detik
      setTimeout(() => setNotifMsg(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center select-none">
          Berikan Feedback & Reviewmu
        </h1>

        {/* Notifikasi poin */}
        {notifMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-md mb-6 text-center font-semibold select-none">
            {notifMsg}
          </div>
        )}

        {/* Info poin saat ini */}
        <div className="bg-purple-100 border-l-4 border-purple-400 text-purple-700 p-4 rounded-md mb-8 text-center font-semibold select-none">
          🎁 Poin Kamu Saat Ini: <span className="text-purple-700 text-2xl">{points}</span>
        </div>

        {/* Form Feedback */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">
              Nama
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-purple-400 focus:ring-2 focus:ring-purple-300"
              placeholder="Masukkan nama kamu"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Rating
            </label>
            <div className="flex space-x-2">
              {stars.map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl cursor-pointer select-none transition-colors duration-200 ${
                    rating >= star ? "text-purple-500" : "text-gray-300 hover:text-purple-400"
                  }`}
                  aria-label={`${star} star`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="comment">
              Review / Feedback
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-purple-400 focus:ring-2 focus:ring-purple-300"
              placeholder="Tulis review atau feedbackmu di sini..."
            />
          </div>

          <button
            type="submit"
            className="bg-purple-500 text-white font-semibold rounded-lg px-6 py-3 hover:bg-purple-600 transition-colors duration-300 w-full"
          >
            Kirim Feedback
          </button>

         {submitted && (
  <p className="text-green-600 font-semibold mt-4 text-center select-none">
    🎉 Terima kasih sudah mengisi feedback! Kamu mendapatkan 5 poin.
  </p>
)}
        </form>

        {/* List Reviews */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6 select-none">Review Pengguna</h2>
          <ul className="space-y-6 max-h-96 overflow-y-auto pr-4">
            {reviews.map(({ id, name, rating, comment, date }) => (
              <li
                key={id}
                className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-700">{name}</p>
                  <p className="text-sm text-gray-500">{date}</p>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < rating ? "text-purple-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">{comment}</p>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
};

export default FeedbackReview;
