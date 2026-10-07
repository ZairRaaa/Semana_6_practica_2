import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "./ProductCard";

export default function ProductDialog({ product, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="product-dialog"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current.close();
      }}
      aria-labelledby="product-title"
    >
      <button
        className="close-dialog"
        autoFocus
        onClick={() => dialog.current.close()}
        aria-label="Cerrar detalles"
      >
        ×
      </button>
      <img src={product.thumbnail} alt={product.title} />
      <p className="eyebrow">{product.category.replaceAll("-", " ")}</p>
      <h2 id="product-title">{product.title}</h2>
      <p>{product.description}</p>
      <strong>{formatPrice(product.price)}</strong>
      <p>Disponibles: {product.stock ?? "Consultar"}</p>
      <Link
        className="button"
        to={`/consultas?producto=${encodeURIComponent(product.title)}`}
      >
        Consultar por este producto ↗
      </Link>
    </dialog>
  );
}
