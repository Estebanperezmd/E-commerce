import { useEffect, useState } from "react";
import "./HomePage.css";

import AppLayout from "../components/AppLayout";
import { repositories } from "../../app/dependencies";
import { listCities } from "../../core/usecases/listCities";
import { listRestaurantsByCity } from "../../core/usecases/listRestaurantsByCity";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [error, setError] = useState("");

  // Cargar ciudades
  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoadingCities(true);
        const result = await listCities(repositories.cityRepository);
        setCities(result);
        if (result.length > 0) setSelectedCityId(result[0].id);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las ciudades");
      } finally {
        setLoadingCities(false);
      }
    };
    loadCities();
  }, []);

  // Cargar restaurantes por ciudad
  useEffect(() => {
    const loadRestaurants = async () => {
      if (!selectedCityId) return;
      try {
        setLoadingRestaurants(true);
        setError("");
        const result = await listRestaurantsByCity(
          repositories.restaurantRepository,
          selectedCityId
        );
        setRestaurants(result);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los restaurantes");
      } finally {
        setLoadingRestaurants(false);
      }
    };
    loadRestaurants();
  }, [selectedCityId]);

  const rightArea = (
    <>
      <select
        className="home__city-select"
        value={selectedCityId || ""}
        onChange={(e) => setSelectedCityId(Number(e.target.value))}
        disabled={loadingCities}
      >
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="home__search"
        placeholder="Buscar (no implementado aún)"
      />
    </>
  );

  return (
    <AppLayout
      title="Restaurantes"
      subtitle="Elige una ciudad y explora restaurantes y su menú."
      rightArea={rightArea}
    >
      {error && <p className="home__error">{error}</p>}

      <section className="home__section">
        <h2 className="home__section-title">
          Restaurantes {loadingRestaurants && " (cargando...)"}
        </h2>

        <div className="restaurant-grid">
          {restaurants.map((r) => (
            <Link
              key={r.id}
              to={`/restaurant/${r.id}`}
              className="restaurant-card"
            >
              <h3>{r.name}</h3>
            </Link>
          ))}

          {restaurants.length === 0 && !loadingRestaurants && (
            <p>No hay restaurantes para esta ciudad.</p>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
