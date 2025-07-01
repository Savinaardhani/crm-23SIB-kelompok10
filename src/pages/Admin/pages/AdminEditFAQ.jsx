import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminEditFAQ() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("faqList")) || [];
    const selected = saved.find((faq) => faq.id === Number(id));
    if (selected) {
      setForm({
        question: selected.question,
        answer: selected.answer,
      });
    } else {
      Swal.fire("Error", "FAQ tidak ditemukan", "error");
      navigate("/admin/faq");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("faqList")) || [];
    const updated = saved.map((faq) =>
      faq.id === Number(id) ? { ...faq, question: form.question, answer: form.answer } : faq
    );
    localStorage.setItem("faqList", JSON.stringify(updated));

    Swal.fire("Sukses", "FAQ berhasil diperbarui", "success").then(() => {
      navigate("/admin/faq");
    });
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">✏️ Edit FAQ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan</label>
          <input
            type="text"
            name="question"
            value={form.question}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban</label>
          <textarea
            name="answer"
            value={form.answer}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
