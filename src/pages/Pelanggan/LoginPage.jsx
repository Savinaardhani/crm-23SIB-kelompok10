import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const role = email === "admin@admin.com" ? "admin" : "pelanggan";

    // Data user baru jika belum ada
    const newUserData = {
      id: Date.now(),
      nama: username,
      email,
      password,
      role,
      telepon: "",
      alamat: "",
      tanggalLahir: "",
      preferensi: "",
      totalBelanja: 0,
      loyalitasManual: "Belum Ada",
    };

    if (role === "pelanggan") {
      const pelangganList = JSON.parse(localStorage.getItem("pelangganList")) || [];
      const existing = pelangganList.find((p) => p.email === email);

      if (existing) {
        // ✅ Jika sudah ada, pakai data lama
        localStorage.setItem("currentUser", JSON.stringify(existing));
        localStorage.setItem("currentCustomer", JSON.stringify(existing));
      } else {
        // ✅ Jika belum ada, tambahkan user baru
        pelangganList.push(newUserData);
        localStorage.setItem("pelangganList", JSON.stringify(pelangganList));
        localStorage.setItem("currentUser", JSON.stringify(newUserData));
        localStorage.setItem("currentCustomer", JSON.stringify(newUserData));
      }

      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); // ✅ Redirect pelanggan ke homepage
    } else {
      // ✅ Admin login
      localStorage.setItem("currentUser", JSON.stringify(newUserData));
      localStorage.setItem("currentCustomer", JSON.stringify(newUserData));
      localStorage.setItem("isLoggedIn", "true");
      navigate("/admin/"); // ✅ Redirect admin ke dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FFF5E1] to-[#FFEFD1]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="login@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-xl"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">© 2025 SFA-MA-SA</p>
      </div>
    </div>
  );
};

export default LoginPage;
