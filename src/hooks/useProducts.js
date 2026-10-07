import { useEffect, useState } from "react";
import { getProducts } from "../services/products";

export default function useProducts() {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: "",
  });
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setState({ products: [], loading: true, error: "" });
      try {
        const products = await getProducts(controller.signal);
        // Solo la solicitud vigente actualiza la vista; agrupar el estado evita
        // actualizaciones separadas tras la respuesta. StrictMode puede iniciar
        // otra petición en desarrollo: el cleanup cancela la anterior.
        if (!controller.signal.aborted)
          setState({ products, loading: false, error: "" });
      } catch {
        if (!controller.signal.aborted)
          setState({
            products: [],
            loading: false,
            error:
              "No pudimos cargar el catálogo. Revisa tu conexión e inténtalo de nuevo.",
          });
      }
    }
    load();
    return () => controller.abort();
  }, [revision]);
  return { ...state, reload: () => setRevision((value) => value + 1) };
}
