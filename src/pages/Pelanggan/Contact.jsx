// src/pages/Contact.jsx
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
      const existing = JSON.parse(localStorage.getItem("kritikSaranList")) || [];
      const newEntry = {
        id: Date.now(),
        ...formData,
      };

      localStorage.setItem("kritikSaranList", JSON.stringify([...existing, newEntry]));

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setSubmitted(false), 6000);
    } else {
      alert("Semua kolom wajib diisi.");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 font-sans">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#8B4513] font-serif mb-4">
          Hubungi Kami
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base">
          Kami siap membantu Anda. Silakan isi formulir atau hubungi kami melalui informasi berikut.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#8B4513]" />
            <div>
              <h4 className="font-semibold text-[#8B4513]">Alamat</h4>
              <p className="text-gray-700">Jl. Lezat No. 88, Pekanbaru, Riau</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-[#8B4513]" />
            <div>
              <h4 className="font-semibold text-[#8B4513]">Telepon</h4>
              <p className="text-gray-700">+62 761 123 456</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-[#8B4513]" />
            <div>
              <h4 className="font-semibold text-[#8B4513]">Email</h4>
              <p className="text-gray-700">cs@hollandbakery.co.id</p>
            </div>
          </div>

          <div className="rounded overflow-hidden shadow-lg">
            <iframe
              title="Google Maps"
              src="https://maps.google.com/maps?q=pekanbaru,%20riau&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-64 border-none"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow space-y-6">
          {submitted && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-700 p-3 rounded-md text-sm transition-all">
              <CheckCircle className="w-5 h-5" />
              <span>Pesan berhasil dikirim. Terima kasih!</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#8B4513] mb-1">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Anda"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#8B4513] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#8B4513] mb-1">Pesan</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Tulis pesan Anda di sini..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              required
            />
          </div>

          <button type="submit" className="bg-[#8B4513] text-white px-6 py-2 rounded hover:bg-[#A0522D] transition">
            Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
