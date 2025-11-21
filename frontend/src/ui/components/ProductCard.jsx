export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card__image">
        {/* imagen real luego */}
        <span>{product.name.charAt(0)}</span>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>
          <button className="product-card__button">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
