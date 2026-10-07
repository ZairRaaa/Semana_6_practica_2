export const formatPrice = value => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(value);

export default function ProductCard({ product, onSelect, onHide }) {
  return <article className="product-card">
    <button className="product-image" onClick={() => onSelect(product)} aria-label={`Ver ${product.title}`}><img src={product.thumbnail} alt={product.title} loading="lazy" /></button>
    <div className="product-meta"><span>{product.category.replaceAll('-', ' ')}</span><span>★ {product.rating ?? '—'}</span></div>
    <h2>{product.title}</h2><strong>{formatPrice(product.price)}</strong>
    <div className="card-actions"><button onClick={() => onSelect(product)}>Ver detalles ↗</button><button onClick={() => onHide(product.id)} aria-label={`Ocultar ${product.title}`}>Ocultar</button></div>
  </article>;
}
