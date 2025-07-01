import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

export default function AdminPromoList() {
  const [promoList, setPromoList] = useState([]);
  const [filterAktif, setFilterAktif] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("promoList")) || [];
    setPromoList(data);
  }, []);

  const isPromoAktif = (promo) => {
    const now = new Date();
    const start = new Date(promo.tanggalMulai);
    const end = new Date(promo.tanggalBerakhir);
    return now >= start && now <= end;
  };

  const formatRupiah = (angka) => {
    return angka.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Promo?",
      text: "Promo yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = promoList.filter((item) => item.id !== id);
        localStorage.setItem("promoList", JSON.stringify(updatedList));
        setPromoList(updatedList);
        Swal.fire("Terhapus!", "Promo telah dihapus.", "success");
      }
    });
  };

  const filteredPromo = filterAktif
    ? promoList.filter((promo) => isPromoAktif(promo))
    : promoList;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🎁 Daftar Promo</h2>
        <Link
          to="/admin/promo/tambah"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Tambah Promo
        </Link>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={filterAktif}
            onChange={(e) => setFilterAktif(e.target.checked)}
          />
          Tampilkan hanya promo aktif
        </label>
      </div>

      <div className="grid gap-4">
        {filteredPromo.length === 0 ? (
          <p className="text-gray-500">Tidak ada promo yang tersedia.</p>
        ) : (
          filteredPromo.map((promo) => (
            <div
              key={promo.id}
              className="p-4 border rounded shadow bg-white flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{promo.nama}</h3>
                <p className="text-sm text-gray-600 mb-1">{promo.deskripsi}</p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Durasi:</span>{" "}
                  {dayjs(promo.tanggalMulai).format("D MMMM YYYY")} –{" "}
                  {dayjs(promo.tanggalBerakhir).format("D MMMM YYYY")}
                </p>
                <p className="text-sm mb-1">
                    <span className="font-medium">Tipe Promo:</span>{" "}
                    {promo.tipe}
                    {promo.tipe === "Diskon" && ` (${promo.nilai}%)`}
                    {promo.tipe === "Cashback" && ` (${formatRupiah(promo.nilai)})`}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                    className={`font-semibold ${
                        isPromoAktif(promo) ? "text-green-600" : "text-red-500"
                    }`}
                    >
                    {isPromoAktif(promo) ? "Aktif" : "Tidak Aktif"}
                    </span>
                </p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                <Link
                    to={`/admin/promo/edit/${promo.id}`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                    Edit
                </Link>
                <button
                    onClick={() => handleDelete(promo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                    Hapus
                </button>
                </div>
            </div>
            ))
        )}
        </div>
    </div>
    );
}
