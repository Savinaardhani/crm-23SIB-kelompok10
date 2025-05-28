import React, { useEffect, useState } from "react";

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

const products = [
  { name: "Roti Cokelat", price: 12000 },
  { name: "Roti Keju", price: 15000 },
  { name: "Roti Stroberi", price: 13000 },
  { name: "Roti Kacang", price: 14000 },
  { name: "Roti Tawar", price: 10000 },
];

export default function Order() {
  const [sales, setSales] = useState([]);
  const [customerHistory, setCustomerHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    invoice: "",
    customerName: "",
    date: "",
    productName: [], // array of products
    total: 0,
    status: "Belum Lunas",
  });

  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem("salesData")) || [];
    const savedCustomers = JSON.parse(localStorage.getItem("customerHistory")) || [];
    setSales(savedSales);
    setCustomerHistory(savedCustomers);
  }, []);

  useEffect(() => {
    localStorage.setItem("salesData", JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem("customerHistory", JSON.stringify(customerHistory));
  }, [customerHistory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = (e) => {
    const selected = e.target.value;
    if (!selected) return;

    const selectedProduct = products.find((p) => p.name === selected);
    if (!selectedProduct) return;

    setFormData((prev) => {
      const updatedProductName = [...prev.productName, selected];
      const updatedTotal = updatedProductName.reduce((acc, curr) => {
        const prod = products.find((p) => p.name === curr);
        return acc + (prod ? prod.price : 0);
      }, 0);

      return {
        ...prev,
        productName: updatedProductName,
        total: updatedTotal,
      };
    });
  };

  const handleRemoveProduct = (index) => {
    setFormData((prev) => {
      const updatedProductName = [...prev.productName];
      updatedProductName.splice(index, 1);
      const updatedTotal = updatedProductName.reduce((acc, curr) => {
        const prod = products.find((p) => p.name === curr);
        return acc + (prod ? prod.price : 0);
      }, 0);
      return {
        ...prev,
        productName: updatedProductName,
        total: updatedTotal,
      };
    });
  };

  const handleAddSale = () => {
    const { invoice, customerName, date, productName, total, status } = formData;

    if (!invoice || !customerName || !date || productName.length === 0) {
      alert("Semua field wajib diisi!");
      return;
    }

    const newSale = {
      id: sales.length + 1,
      invoice,
      customerName: customerName.trim(),
      date,
      productName,
      total: Number(total),
      status,
    };

    setSales([...sales, newSale]);

    if (!customerHistory.includes(customerName.trim())) {
      setCustomerHistory([...customerHistory, customerName.trim()]);
    }

    setFormData({
      invoice: "",
      customerName: "",
      date: "",
      productName: [],
      total: 0,
      status: "Belum Lunas",
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus penjualan ini?")) {
      const updatedSales = sales.filter((s) => s.id !== id);
      setSales(updatedSales);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Pencatatan Order Digital</h1>
      <p className="text-gray-600 mb-6">
        Input pesanan pelanggan secara real-time untuk mengurangi kesalahan pencatatan dan mempercepat proses pemesanan.
      </p>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        {showForm ? "Batal Tambah Penjualan" : "Tambah Penjualan"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded shadow-sm bg-white">
          <div className="mb-2">
            <label className="block font-medium mb-1">Nomor Invoice</label>
            <input
              type="text"
              name="invoice"
              value={formData.invoice}
              onChange={handleInputChange}
              placeholder="Misal: INV-000"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-2">
            <label className="block font-medium mb-1">Nama Pelanggan</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              placeholder="Nama pelanggan"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-2">
            <label className="block font-medium mb-1">Tanggal</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-2">
            <label className="block font-medium mb-1">Tambah Produk</label>
            <select
              onChange={handleAddProduct}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Pilih Produk --</option>
              {products.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {formData.productName.length > 0 && (
            <div className="mb-4">
              <p className="font-medium">Produk Dibeli:</p>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                {formData.productName.map((name, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    {name}{" "}
                    <button
                      onClick={() => handleRemoveProduct(idx)}
                      className="ml-2 text-red-500 hover:underline text-xs"
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
              <p className="font-medium mt-2">Total Harga: {formatCurrency(formData.total)}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Belum Lunas">Belum Lunas</option>
              <option value="Lunas">Lunas</option>
              <option value="Batal">Batal</option>
            </select>
          </div>

          <button
            onClick={handleAddSale}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Simpan
          </button>
        </div>
      )}

      {/* Tabel Penjualan */}
      <div className="overflow-x-auto bg-white rounded shadow mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{sale.invoice}</td>
                <td className="px-6 py-4">{sale.customerName}</td>
                <td className="px-6 py-4">{sale.date}</td>
                <td className="px-6 py-4">
                  {Array.isArray(sale.productName)
                    ? sale.productName.join(", ")
                    : sale.productName}
                </td>
                <td className="px-6 py-4 text-right">{formatCurrency(sale.total)}</td>
                <td className="px-6 py-4 text-center">
                  {sale.status === "Lunas" ? (
                    <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">Lunas</span>
                  ) : sale.status === "Belum Lunas" ? (
                    <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Belum Lunas</span>
                  ) : (
                    <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-red-100 text-red-800">Batal</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900 font-semibold" onClick={() => alert("Fitur Edit belum tersedia")}>Edit</button>
                  <button className="text-red-600 hover:text-red-900 font-semibold" onClick={() => handleDelete(sale.id)}>Hapus</button>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">Tidak ada data penjualan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Riwayat Pelanggan */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Profil & Riwayat Pelanggan</h2>
        <p className="text-sm text-gray-600 mb-3">
          Menyimpan data dan histori pembelian pelanggan untuk pendekatan personal dalam penjualan dan penawaran produk.
        </p>

        {customerHistory.length === 0 ? (
          <p className="text-gray-500">Belum ada riwayat pelanggan.</p>
        ) : (
          customerHistory.map((customer, idx) => {
            const customerSales = sales.filter((s) => s.customerName === customer);
            return (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold text-indigo-600">{customer}</h3>
                <ul className="ml-4 list-disc text-sm text-gray-700">
                  {customerSales.map((sale) => (
                    <li key={sale.id}>
                      {sale.date} | {sale.invoice} | {Array.isArray(sale.productName) ? sale.productName.join(", ") : sale.productName} | {formatCurrency(sale.total)} | {sale.status}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
