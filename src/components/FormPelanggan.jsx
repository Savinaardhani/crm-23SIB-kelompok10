import { useState, useEffect } from 'react';

const PelangganForm = ({ addUser, updateUser, editingUser }) => {
  // Sesuaikan state form dengan kolom tabel pelanggan
  const [form, setForm] = useState({
    nama_pelanggan: '',
    email_pelanggan: '',
    notelp_pelanggan: '',
    alamat_pelanggan: '',
    tanggal_lahir: ''
  });

  useEffect(() => {
    if (editingUser) setForm(editingUser);
    else
      setForm({
        nama_pelanggan: '',
        email_pelanggan: '',
        notelp_pelanggan: '',
        alamat_pelanggan: '',
        tanggal_lahir: ''
      });
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi wajib: nama, email, notelp (bisa ditambah sesuai kebutuhan)
    if (
      !form.nama_pelanggan ||
      !form.email_pelanggan ||
      !form.notelp_pelanggan
    )
      return;

    editingUser ? updateUser(form) : addUser(form);

    setForm({
      nama_pelanggan: '',
      email_pelanggan: '',
      notelp_pelanggan: '',
      alamat_pelanggan: '',
      tanggal_lahir: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Nama Pelanggan"
        className="w-full p-2 border rounded"
        value={form.nama_pelanggan}
        onChange={(e) =>
          setForm({ ...form, nama_pelanggan: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email Pelanggan"
        className="w-full p-2 border rounded"
        value={form.email_pelanggan}
        onChange={(e) =>
          setForm({ ...form, email_pelanggan: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="No. Telepon Pelanggan"
        className="w-full p-2 border rounded"
        value={form.notelp_pelanggan}
        onChange={(e) =>
          setForm({ ...form, notelp_pelanggan: e.target.value })
        }
      />
      <textarea
        placeholder="Alamat Pelanggan"
        className="w-full p-2 border rounded"
        value={form.alamat_pelanggan}
        onChange={(e) =>
          setForm({ ...form, alamat_pelanggan: e.target.value })
        }
      />
      <input
        type="date"
        placeholder="Tanggal Lahir"
        className="w-full p-2 border rounded"
        value={form.tanggal_lahir}
        onChange={(e) =>
          setForm({ ...form, tanggal_lahir: e.target.value })
        }
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        {editingUser ? 'Perbarui' : 'Tambah'}
      </button>
    </form>
  );
};

export default PelangganForm;
