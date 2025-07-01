// utils/kategoriStorage.js
export const getKategoriList = () => {
  return JSON.parse(localStorage.getItem("kategoriList")) || [];
};

export const setKategoriList = (list) => {
  localStorage.setItem("kategoriList", JSON.stringify(list));
};

export const addKategori = (nama) => {
  const list = getKategoriList();
  if (!list.includes(nama)) {
    list.push(nama);
    setKategoriList(list);
  }
};
