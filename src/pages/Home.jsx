import { Link } from 'react-router-dom';

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">UNA MIRADA A LO COTIDIANO</p><h1>Pequeñas cosas.<br /><em>Buenos días.</em></h1><p>Descubre nuevos favoritos para tu casa, tu rutina y esos momentos que son solo tuyos.</p><Link className="button" to="/catalogo">Explorar el catálogo <span>↗</span></Link><div className="hero-caption">Una selección para encontrar algo muy tuyo.</div></div>
      <div className="hero-art" role="img" aria-label="Ilustración de una planta y un jarrón sobre una mesa"><span className="art-label">LA BELLEZA DE LO SIMPLE</span><div className="sun" /><div className="stem"><i /><i /><i /></div><div className="vase" /><div className="cup" /><div className="table" /><span className="art-caption">Objetos que acompañan.</span></div>
    </section>
    <section className="intro"><p className="eyebrow">ELIGE A TU MANERA</p><h2>Un lugar para tus próximos favoritos.</h2><p>Explora con calma, encuentra lo que te interesa y cuéntanos qué tienes en mente.</p></section>
    <div className="feature-grid">
      {[['01', 'Descubre', 'Productos de distintas categorías, reunidos en un solo lugar.'], ['02', 'Encuentra', 'Busca por nombre y filtra para acercarte a lo que necesitas.'], ['03', 'Conversemos', 'Prepara tu consulta con los detalles que hacen la diferencia.']].map(([number, title, description]) => <article className="feature" key={number}><span>{number} /</span><h3>{title}</h3><p>{description}</p></article>)}
    </div>
    <section className="callout"><div><p className="eyebrow">ESTAMOS PARA AYUDARTE</p><h2>¿Algo en mente?</h2></div><Link className="button secondary" to="/consultas">Preparar una consulta ↗</Link></section>
  </>;
}
