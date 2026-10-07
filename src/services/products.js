import axios from 'axios';

export async function getProducts(signal) {
  const { data } = await axios.get('https://dummyjson.com/products', {
    signal, timeout: 15000, params: { limit: 100 },
  });
  if (!Array.isArray(data.products) || data.products.some(product =>
    !Number.isFinite(product.id) || typeof product.title !== 'string' ||
    !Number.isFinite(product.price) || typeof product.category !== 'string')) {
    throw new Error('La respuesta del catálogo no tiene el formato esperado.');
  }
  return data.products;
}
