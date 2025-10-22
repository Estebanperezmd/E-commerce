/**
 * Interfaz que define las operaciones disponibles para el repositorio de productos
 * Siguiendo los principios de Clean Architecture, esta interfaz pertenece al dominio
 * y las implementaciones concretas estarán en la capa de infraestructura
 */
class IProductRepository {
  /**
   * Crea un nuevo producto en el repositorio
   * @param {Product} product - Entidad de producto a crear
   * @throws {Error} Si el producto ya existe o hay datos inválidos
   * @returns {Promise<Product>} Producto creado con su ID asignado
   */
  async create(product) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca un producto por su ID
   * @param {number} id - ID del producto a buscar
   * @returns {Promise<Product|null>} Producto encontrado o null si no existe
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca productos según los filtros especificados
   * @param {Object} filters - Criterios de búsqueda
   * @param {string} [filters.categoria] - Categoría de productos
   * @param {number} [filters.precioMin] - Precio mínimo
   * @param {number} [filters.precioMax] - Precio máximo
   * @param {number} [filters.stockMin] - Stock mínimo disponible
   * @returns {Promise<Product[]>} Lista de productos que cumplen los criterios
   */
  async findAll(filters = {}) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza un producto existente
   * @param {number} id - ID del producto a actualizar
   * @param {Partial<Product>} productData - Datos parciales del producto a actualizar
   * @throws {Error} Si el producto no existe o hay datos inválidos
   * @returns {Promise<Product>} Producto actualizado
   */
  async update(id, productData) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina un producto del repositorio
   * @param {number} id - ID del producto a eliminar
   * @throws {Error} Si el producto no existe o no se puede eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza el stock de un producto
   * @param {number} id - ID del producto
   * @param {number} quantity - Cantidad a añadir (positivo) o restar (negativo)
   * @throws {Error} Si el producto no existe o el stock resultante es negativo
   * @returns {Promise<Product>} Producto con el stock actualizado
   */
  async updateStock(id, quantity) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca productos por categoría
   * @param {string} categoria - Categoría a buscar
   * @returns {Promise<Product[]>} Lista de productos de la categoría
   */
  async findByCategoria(categoria) {
    throw new Error('Method not implemented');
  }

  /**
   * Verifica si hay stock suficiente de un producto
   * @param {number} id - ID del producto
   * @param {number} quantity - Cantidad requerida
   * @returns {Promise<boolean>} true si hay stock suficiente
   */
  async hasStock(id, quantity) {
    throw new Error('Method not implemented');
  }
}

module.exports = IProductRepository;