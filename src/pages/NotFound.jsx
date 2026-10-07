import { Link } from 'react-router-dom';
export default function NotFound() {
  return <section className="empty"><p className="eyebrow">404 · PÁGINA NO ENCONTRADA</p><h1>Por aquí no era.</h1><p>Pero hay mucho por descubrir en Nido.</p><Link className="button" to="/">Volver al inicio ↗</Link></section>;
}
