const TermsAndConditions = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-[#8B4513] text-center font-serif">
        Syarat & Ketentuan
      </h1>

      <div className="space-y-6 text-justify leading-relaxed">
        <p>
          Dengan menggunakan situs dan layanan Holland Bakery, Anda menyetujui Syarat dan Ketentuan yang berlaku berikut ini.
        </p>

        <h2 className="text-2xl font-semibold text-[#8B4513]">1. Pemesanan</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Pesanan dapat dilakukan melalui situs resmi atau aplikasi kami.</li>
          <li>Pesanan khusus seperti custom cake harus dilakukan minimal 3 hari sebelum tanggal pengambilan.</li>
          <li>Setiap pesanan dianggap sah setelah pembayaran berhasil dilakukan.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#8B4513]">2. Pembayaran</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Kami menerima berbagai metode pembayaran termasuk transfer bank, e-wallet, dan kartu kredit.</li>
          <li>Pembayaran harus diselesaikan dalam waktu yang telah ditentukan untuk menghindari pembatalan otomatis.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#8B4513]">3. Pengiriman</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Pengiriman hanya dilakukan pada wilayah yang tercakup oleh layanan kami.</li>
          <li>Waktu pengiriman tergantung pada lokasi dan ketersediaan produk.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#8B4513]">4. Pengembalian & Refund</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Produk yang sudah dibeli tidak dapat dikembalikan kecuali terdapat kerusakan atau kesalahan pengiriman.</li>
          <li>Permintaan refund harus dilakukan maksimal 1x24 jam setelah pesanan diterima.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#8B4513]">5. Perubahan Kebijakan</h2>
        <p>
          Holland Bakery berhak mengubah syarat & ketentuan ini tanpa pemberitahuan sebelumnya. Pengguna disarankan untuk membaca secara berkala.
        </p>

        <p className="text-sm text-gray-500 italic mt-6">
          Terakhir diperbarui: 17 Juni 2025
        </p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
