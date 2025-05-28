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
    { label: "Pendapatan Hari Ini", value: "$53,000", percent: "+55%", color: "purple" },  // ubah dari yellow ke purple
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
        backgroundColor: "rgba(139, 92, 246, 0.7)", // ungu Tailwind (purple-500)
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
        color: "#7c3aed",  // ungu (purple-600)
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

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <Bar options={barOptions} data={barData} />
          </div>
          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <Line options={lineOptions} data={lineData} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
