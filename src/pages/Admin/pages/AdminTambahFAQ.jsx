import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminTambahFAQ() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("faqList")) || [];
    const newData = {
      ...form,
      id: Date.now(),
    };
  localStorage.setItem("faqList", JSON.stringify([...saved, newData]));

    Swal.fire("Berhasil", "FAQ berhasil ditambahkan", "success").then((result) => {
        console.log("Navigasi ke /admin/faq");
        navigate("/admin/faq");
});

  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">➕ Tambah FAQ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pertanyaan</label>
          <input
            type="text"
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="Contoh: Apakah produk halal?"
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Jawaban</label>
          <textarea
            name="answer"
            value={form.answer}
            onChange={handleChange}
            placeholder="Contoh: Semua produk kami telah tersertifikasi halal oleh MUI."
            required
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Simpan FAQ
          </button>
        </div>
      </form>
    </div>
  );
}
