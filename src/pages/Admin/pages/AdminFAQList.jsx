import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminFAQList() {
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("faqList")) || [];
    setFaqList(data);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus FAQ?",
      text: "Data tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = faqList.filter((faq) => faq.id !== id);
        setFaqList(updated);
        localStorage.setItem("faqList", JSON.stringify(updated));
        Swal.fire("Dihapus!", "FAQ berhasil dihapus.", "success");
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">📋 Daftar FAQ</h2>
        <Link
          to="/admin/faq/tambah"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Tambah FAQ
        </Link>
      </div>

      {faqList.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada FAQ.</p>
      ) : (
        <div className="space-y-4">
          {faqList.map((faq) => (
            <div key={faq.id} className="bg-white border rounded p-4 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
                </div>
                <div className="flex flex-col items-end gap-2 text-sm">
                  <Link
                    to={`/admin/faq/edit/${faq.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
