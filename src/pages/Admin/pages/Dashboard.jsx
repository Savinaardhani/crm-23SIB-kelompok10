import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { FiShoppingBag, FiUsers, FiBox, FiGift } from "react-icons/fi";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [menus, setMenus] = useState([]);
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const syncData = () => {
      const rawOrders = JSON.parse(localStorage.getItem("orderList")) || [];
      const filteredOrders = rawOrders.filter(o => o && typeof o.total === "number");
      setOrders(filteredOrders);

      setPelanggan(JSON.parse(localStorage.getItem("pelangganList")) || []);
      setMenus(JSON.parse(localStorage.getItem("produkList")) || []);
      setPromos(JSON.parse(localStorage.getItem("promoList")) || []);
    };

    syncData();
    const interval = setInterval(syncData, 2000);
    return () => clearInterval(interval);
  }, []);

  const totalOrderAmount = orders.reduce(
    (acc, curr) => acc + (typeof curr.total === "number" ? curr.total : 0),
    0
  );

  const loyaltyCount = { Silver: 0, Gold: 0, Platinum: 0 };
  pelanggan.forEach((p) => {
    const total = p.totalBelanja;
    if (total > 1000000) loyaltyCount["Platinum"] += 1;
    else if (total >= 500000) loyaltyCount["Gold"] += 1;
    else if (total >= 200000) loyaltyCount["Silver"] += 1;
  });

  const pieLoyaltyData = Object.entries(loyaltyCount).map(([key, value]) => ({ name: key, value }));
  const loyaltyColors = { Silver: "#9ca3af", Gold: "#facc15", Platinum: "#1f2937" };

  const bulanIndonesia = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const monthlySales = Array.from({ length: 12 }, (_, i) => ({
    month: bulanIndonesia[i],
    total: 0,
  }));

  orders.forEach((o) => {
    const date = new Date(o.tanggal);
    if (!isNaN(date)) {
      const monthIndex = date.getMonth();
      monthlySales[monthIndex].total += o.total;
    }
  });

  const categoryCount = {};
  menus.forEach((m) => {
    if (!categoryCount[m.kategori]) categoryCount[m.kategori] = 0;
    categoryCount[m.kategori] += 1;
  });

  const pieCategoryData = Object.entries(categoryCount).map(([key, value]) => ({ name: key, value }));
  const categoryColors = ["#60a5fa", "#34d399", "#f472b6", "#facc15", "#a78bfa", "#f87171"];

  const StatCard = ({ label, value, icon: Icon, iconColor }) => (
    <div className="p-4 shadow-md bg-white rounded-md flex items-center gap-4">
      <div
        className="text-3xl p-2 rounded-full"
        style={{ backgroundColor: iconColor + "1A", color: iconColor }}
      >
        <Icon />
      </div>
      <div>
        <h3 className="text-sm text-gray-500">{label}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">📊 Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          label="Total Order"
          value={orders.length}
          icon={FiShoppingBag}
          iconColor="#3b82f6"
        />
        <StatCard
          label="Total Pembayaran"
          value={"Rp " + totalOrderAmount.toLocaleString("id-ID")}
          icon={FiShoppingBag}
          iconColor="#f97316"
        />
        <StatCard
          label="Total Pelanggan"
          value={pelanggan.length}
          icon={FiUsers}
          iconColor="#10b981"
        />
        <StatCard
          label="Total Menu"
          value={menus.length}
          icon={FiBox}
          iconColor="#f59e0b"
        />
        <StatCard
          label="Total Promo"
          value={promos.length}
          icon={FiGift}
          iconColor="#8b5cf6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📈 Penjualan per Bulan */}
        <div className="p-4 bg-white rounded-md shadow md:col-span-2">
          <h2 className="font-bold mb-2 text-gray-700">📈 Penjualan per Bulan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </div>
      </div>
  );
};

export default Dashboard;
