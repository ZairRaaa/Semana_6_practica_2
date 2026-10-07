import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductDialog from '../components/ProductDialog';

export default function List() {
  const { products, loading, error, reload } = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [hidden, setHidden] = useState([]);
  const [selected, setSelected] = useState(null);
  const categories = [...new Set(products.map(product => product.category))].sort();
  const visible = products.filter(product => !hidden.includes(product.id) && (!category || product.category === category) && product.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  function refresh() { setHidden([]); setCategory(''); setQuery(''); reload(); }
  return <>
    <section className="page-heading"><p className="eyebrow">DESCUBRE NIDO</p><h1>Encuentra tu próximo favorito.</h1><p>Una selección para tu rutina y tu espacio. Precios referenciales en dólares (USD).</p></section>
    <div className="catalog-toolbar"><label className="search">Buscar un producto<input type="search" placeholder="¿Qué estás buscando?" value={query} onChange={event => setQuery(event.target.value)} /></label><label>Categoría<select value={category} onChange={event => setCategory(event.target.value)}><option value="">Todas las categorías</option>{categories.map(item => <option key={item} value={item}>{item.replaceAll('-', ' ')}</option>)}</select></label><button className="button secondary" onClick={refresh} disabled={loading}>↻ Recargar</button></div>
    {loading ? <div className="empty" role="status"><span className="spinner" /><p>Estamos reuniendo tus próximos favoritos…</p></div> : error ? <div className="empty" role="alert"><h2>No pudimos conectar.</h2><p>{error}</p><button className="button" onClick={refresh}>Intentar de nuevo</button></div> : <>
      <div className="result-bar"><span role="status">{visible.length} productos</span>{hidden.length > 0 && <button className="text-button" onClick={() => setHidden([])}>Restaurar {hidden.length} ocultos</button>}</div>
      {visible.length ? <div className="product-grid">{visible.map(product => <ProductCard key={product.id} product={product} onSelect={setSelected} onHide={id => setHidden(current => [...current, id])} />)}</div> : <div className="empty"><h2>No encontramos coincidencias.</h2><p>Prueba otra búsqueda o restaura los productos ocultos.</p><button className="button secondary" onClick={() => { setQuery(''); setCategory(''); setHidden([]); }}>Mostrar todos</button></div>}
      <p className="catalog-note">Selección de muestra proporcionada por DummyJSON. Ocultar solo modifica esta vista.</p>
    </>}
    {selected && <ProductDialog product={selected} onClose={() => setSelected(null)} />}
  </>;
}
