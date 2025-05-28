import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8b5cf6",
  "#ec4899",
  "#10b981",
  "#facc15",
  "#f97316",
  "#3b82f6",
  "#a855f7",
  "#f43f5e",
  "#14b8a6",
  "#f59e0b",
  "#6366f1",
  "#22d3ee",
  "#e11d48",
  "#84cc16",
];

const PelacakanBahanBaku = () => {
  const [bahanBaku, setBahanBaku] = useState([
    { nama: "Tepung Terigu", stok: 50 },
    { nama: "Gula Pasir", stok: 20 },
    { nama: "Telur", stok: 30 },
    { nama: "Mentega", stok: 10 },
    { nama: "Cokelat Bubuk", stok: 5 },
  ]);

  const [nama, setNama] = useState("");
  const [stok, setStok] = useState("");

  const getColorByName = (name) => {
    const index = bahanBaku.findIndex((item) => item.nama === name);
    return COLORS[index % COLORS.length];
  };

  const handleTambahBahan = () => {
    if (!nama || !stok) {
      alert("Nama dan stok harus diisi!");
      return;
    }

    if (bahanBaku.some((b) => b.nama.toLowerCase() === nama.toLowerCase())) {
      alert("Bahan baku sudah ada!");
      return;
    }

    const stokNum = parseInt(stok);
    if (isNaN(stokNum) || stokNum < 0) {
      alert("Stok harus berupa angka positif!");
      return;
    }

    setBahanBaku([...bahanBaku, { nama, stok: stokNum }]);
    setNama("");
    setStok("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Pelacakan Bahan Baku</h1>

      {/* Form Tambah Bahan */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Tambah Bahan Baku</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nama bahan baku"
            className="border px-3 py-2 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stok"
            className="border px-3 py-2 rounded"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
          />
          <button
            onClick={handleTambahBahan}
            className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition"
          >
            Tambah Bahan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Jumlah Stok per Bahan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bahanBaku}>
              <XAxis dataKey="nama" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stok">
                {bahanBaku.map((item, index) => (
                  <Cell key={`bar-${index}`} fill={getColorByName(item.nama)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Persentase Stok Bahan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bahanBaku}
                dataKey="stok"
                nameKey="nama"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {bahanBaku.map((item, index) => (
                  <Cell key={`pie-${index}`} fill={getColorByName(item.nama)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4">
            {bahanBaku.map((item, index) => (
              <div key={`legend-${index}`} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: getColorByName(item.nama) }}
                />
                <span className="text-sm text-gray-700">{item.nama}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PelacakanBahanBaku;
