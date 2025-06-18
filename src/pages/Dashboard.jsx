import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { ShoppingCart, Star, AlertTriangle } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const stats = [
    { label: "Pendapatan Hari Ini", value: "$53,000", percent: "+55%", color: "purple" },
    { label: "Pengguna Hari Ini", value: "2,300", percent: "+3%", color: "blue" },
    { label: "Klien Baru", value: "+3,462", percent: "-2%", color: "red" },
    { label: "Penjualan", value: "$103,430", percent: "+5%", color: "purple" },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Penjualan (dalam ribuan $)",
        data: [12, 19, 14, 17, 22, 30, 28, 26, 32, 35, 40, 45],
        backgroundColor: "rgba(139, 92, 246, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Penjualan Bulanan Tahun Ini",
        color: "#7c3aed",
        font: { weight: "bold", size: 18 },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Jumlah Pelanggan",
        data: [50, 75, 120, 180, 220, 260, 300, 350, 400, 430, 460, 500],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Pertumbuhan Pelanggan Tahun Ini",
        color: "#15803d",
        font: { weight: "bold", size: 18 },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-600 mb-2 select-none">🍞 Holland Bakery Dashboard</h1>
          <p className="text-gray-600 text-lg">Statistik performa bisnis yang interaktif dan informatif</p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ label, value, percent, color }) => (
            <div
              key={label}
              className="bg-white border border-gray-100 rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <p className="text-sm text-gray-500 mb-3 font-medium">{label}</p>
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-extrabold text-${color}-600`}>{value}</span>
                <span className={`text-sm font-semibold text-${color}-500 bg-${color}-100 px-3 py-1 rounded-full select-none`}>
                  {percent}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Insight Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-5 bg-white rounded-3xl shadow-md hover:shadow-lg transition">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
              <ShoppingCart size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Hari Ini</p>
              <p className="text-lg font-bold">152</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-white rounded-3xl shadow-md hover:shadow-lg transition">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
              <Star size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Produk Terlaris</p>
              <p className="text-lg font-bold">Roti Coklat</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-white rounded-3xl shadow-md hover:shadow-lg transition">
            <div className="bg-red-100 text-red-600 p-3 rounded-full">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Stok Menipis</p>
              <p className="text-lg font-bold">Tepung Terigu</p>
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <Bar options={barOptions} data={barData} />
          </div>
          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <Line options={lineOptions} data={lineData} />
          </div>
        </section>

        {/* Order Table */}
        <section className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-bold text-purple-600 mb-4">Order Terbaru</h2>
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-500 uppercase border-b">
              <tr>
                <th className="py-2">#</th>
                <th className="py-2">Nama Pelanggan</th>
                <th className="py-2">Produk</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, nama: "Sari", produk: "Roti Tawar", total: "$15", status: "Selesai" },
                { id: 2, nama: "Budi", produk: "Kue Brownies", total: "$20", status: "Diproses" },
                { id: 3, nama: "Ayu", produk: "Roti Coklat", total: "$12", status: "Batal" },
              ].map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.nama}</td>
                  <td className="py-2">{order.produk}</td>
                  <td className="py-2">{order.total}</td>
                  <td className="py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Selesai"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Diproses"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 mt-10">
          © {new Date().getFullYear()} Holland Bakery. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
