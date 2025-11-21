import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { repositories } from "../../app/dependencies";
import { listProductsByRestaurant } from "../../core/usecases/listProductsByRestaurant";
import { useCart } from "../../app/CartContext";
import AppLayout from "../components/AppLayout";
import "./RestaurantPage.css";

export default function RestaurantPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const menu = await listProductsByRestaurant(
          repositories.productRepository,
          restaurantId
        );

        const restaurantList =
          await repositories.restaurantRepository.listByCity(1);
        const info = restaurantList.find(
          (r) => r.id === Number(restaurantId)
        );

        setRestaurant(info ?? { id: Number(restaurantId), name: "Restaurante" });
        setProducts(menu);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el menú del restaurante");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [restaurantId]);

  if (loading) {
    return (
      <AppLayout title="Cargando..." subtitle="">
        <div className="restaurant-page">Cargando menú...</div>
      </AppLayout>
    );
  }

  const handleAddToCart = (product) => {
    addItem(product, restaurant);
  };

  return (
    <AppLayout title={restaurant?.name} subtitle="Menú">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {error && <p className="restaurant-page__error">{error}</p>}

      <div className="menu-grid">
        {products.map((p) => (
          <div key={p.id} className="menu-card">
            <h3 className="menu-card__name">{p.name}</h3>
            <p className="menu-card__price">${p.price.toFixed(2)}</p>

            <button
              className="menu-card__button"
              onClick={() => handleAddToCart(p)}
            >
              Añadir al carrito
            </button>
          </div>
        ))}

        {products.length === 0 && !error && (
          <p>No hay productos registrados para este restaurante.</p>
        )}
      </div>
    </AppLayout>
  );
}
