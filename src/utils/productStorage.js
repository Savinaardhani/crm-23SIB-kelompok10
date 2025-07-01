// utils/productStorage.js

const STORAGE_KEY = "produkList";

export function getProdukList() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function addProduk(produk) {
  const currentList = getProdukList();
  const updated = [...currentList, produk];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getProdukById(id) {
  return getProdukList().find((item) => item.id === Number(id));
}

export function updateProduk(id, updatedData) {
  const currentList = getProdukList().map((item) =>
    item.id === Number(id) ? { ...item, ...updatedData } : item
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentList));
}

export function deleteProdukById(id) {
  const updatedList = getProdukList().filter((item) => item.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
}
