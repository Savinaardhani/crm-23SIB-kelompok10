const About = () => {
  return (
    <section className="bg-white px-10 py-16 rounded-lg flex flex-col md:flex-row items-center justify-between gap-10 shadow-md">
      {/* Text Section */}
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold text-yellow-900 italic mb-6">Who We Are</h2>
        <p className="text-gray-800 text-lg leading-relaxed mb-4">
          <span className="font-semibold text-yellow-700">Holland Bakery</span> adalah pelopor roti modern di Indonesia sejak 1978.
          Kami menggabungkan resep tradisional dan teknologi modern untuk menghadirkan roti, kue, dan pastry berkualitas tinggi.
        </p>
        <p className="text-gray-800 text-lg leading-relaxed mb-4">
          Dikenal dengan slogan <span className="italic">"Quality is Our Tradition"</span>, kami telah hadir di berbagai penjuru Indonesia
          untuk menyempurnakan setiap momen spesial Anda — dari sarapan hingga perayaan.
        </p>
        <p className="text-gray-800 text-lg leading-relaxed">
          Kami percaya bahwa setiap gigitan harus menciptakan kebahagiaan dan kenangan.
          Itulah sebabnya kami selalu menjaga cita rasa dan kualitas di setiap produk.
        </p>
      </div>

      {/* Galeri Bertingkat */}
        <div className="grid grid-cols-3 gap-6">
          <div className="transform hover:scale-105 transition-transform duration-500 delay-100">
            <img
              src="/img/hb.jpg"
              alt="Roti segar"
              className="h-72 w-full object-cover rounded-2xl shadow-md"
            />
          </div>
          <div className="transform hover:scale-105 transition-transform duration-500 delay-200 mt-10">
            <img
              src="/img/bakery.jpg"
              alt="Interior toko"
              className="h-80 w-full object-cover rounded-2xl shadow-md"
            />
          </div>
          <div className="transform hover:scale-105 transition-transform duration-500 delay-300 mt-5">
            <img
              src="/img/hollandd.jpg"
              alt="Kue dan donat"
              className="h-72 w-full object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
    </section>
  );
};

export default About;
