const IProductRepository = require('../../domain/repositories/IProductRepository');
const Product = require('../../domain/entities/Product');
const ConnectionFactory = require('../databases/ConnectionFactory');

class ProductRepositoryImpl extends IProductRepository {
  /**
   * Crea un nuevo producto
   */
  async create(product) {
    try {
      const query = `
        INSERT INTO productos (nombre, descripcion, precio, stock, categoria)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, nombre, descripcion, precio, stock, categoria, fecha_creacion
      `;
      const values = [
        product.nombre,
        product.descripcion,
        product.precio,
        product.stock,
        product.categoria
      ];
      
      const result = await ConnectionFactory.query(query, values);
      if (!result.rows[0]) {
        throw new Error('Error al crear el producto');
      }
      return this._mapToProduct(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  /**
   * Busca un producto por ID
   */
  async findById(id) {
    try {
      const query = 'SELECT * FROM productos WHERE id = $1';
      const result = await ConnectionFactory.query(query, [id]);
      if (result.rows.length === 0) return null;
      return this._mapToProduct(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar producto: ${error.message}`);
    }
  }

  /**
   * Busca productos con filtros
   */
  async findAll(filters = {}) {
    try {
      const { query, values } = this._buildFindAllQuery(filters);
      const result = await ConnectionFactory.query(query, values);
      return result.rows.map(row => this._mapToProduct(row));
    } catch (error) {
      throw new Error(`Error al buscar productos: ${error.message}`);
    }
  }

  /**
   * Actualiza un producto
   */
  async update(id, productData) {
    try {
      const existingProduct = await this.findById(id);
      if (!existingProduct) {
        throw new Error('Producto no encontrado');
      }

      const query = `
        UPDATE productos 
        SET nombre = $1, descripcion = $2, precio = $3, stock = $4, categoria = $5
        WHERE id = $6
        RETURNING id, nombre, descripcion, precio, stock, categoria, fecha_creacion
      `;
      const values = [
        productData.nombre || existingProduct.nombre,
        productData.descripcion || existingProduct.descripcion,
        productData.precio || existingProduct.precio,
        productData.stock || existingProduct.stock,
        productData.categoria || existingProduct.categoria,
        id
      ];
      
      const result = await ConnectionFactory.query(query, values);
      if (!result.rows[0]) {
        throw new Error('Error al actualizar el producto');
      }
      return this._mapToProduct(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  /**
   * Elimina un producto
   */
  async delete(id) {
    try {
      const existingProduct = await this.findById(id);
      if (!existingProduct) {
        throw new Error('Producto no encontrado');
      }

      const query = 'DELETE FROM productos WHERE id = $1';
      await ConnectionFactory.query(query, [id]);
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }

  /**
   * Actualiza el stock de un producto
   */
  async updateStock(id, quantity) {
    try {
      const existingProduct = await this.findById(id);
      if (!existingProduct) {
        throw new Error('Producto no encontrado');
      }

      if (existingProduct.stock + quantity < 0) {
        throw new Error('Stock insuficiente');
      }

      const query = `
        UPDATE productos 
        SET stock = stock + $1
        WHERE id = $2
        RETURNING id, nombre, descripcion, precio, stock, categoria, fecha_creacion
      `;
      const result = await ConnectionFactory.query(query, [quantity, id]);
      return this._mapToProduct(result.rows[0]);
    } catch (error) {
      throw new Error(`Error al actualizar stock: ${error.message}`);
    }
  }

  /**
   * Busca productos por categoría
   */
  async findByCategoria(categoria) {
    try {
      const query = 'SELECT * FROM productos WHERE categoria = $1';
      const result = await ConnectionFactory.query(query, [categoria]);
      return result.rows.map(row => this._mapToProduct(row));
    } catch (error) {
      throw new Error(`Error al buscar productos por categoría: ${error.message}`);
    }
  }

  /**
   * Verifica si hay stock suficiente
   */
  async hasStock(id, quantity) {
    try {
      const product = await this.findById(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product.stock >= quantity;
    } catch (error) {
      throw new Error(`Error al verificar stock: ${error.message}`);
    }
  }

  /**
   * Construye la query para findAll con filtros
   */
  _buildFindAllQuery(filters) {
    let query = 'SELECT * FROM productos WHERE 1=1';
    const values = [];
    let paramCount = 1;

    if (filters.categoria) {
      query += ` AND categoria = $${paramCount}`;
      values.push(filters.categoria);
      paramCount++;
    }

    if (filters.precioMin) {
      query += ` AND precio >= $${paramCount}`;
      values.push(filters.precioMin);
      paramCount++;
    }

    if (filters.precioMax) {
      query += ` AND precio <= $${paramCount}`;
      values.push(filters.precioMax);
      paramCount++;
    }

    if (filters.stockMin) {
      query += ` AND stock >= $${paramCount}`;
      values.push(filters.stockMin);
      paramCount++;
    }

    return { query, values };
  }

  /**
   * Mapea un registro de la base de datos a una entidad Product
   */
  _mapToProduct(row) {
    return new Product(
      row.id,
      row.nombre,
      row.descripcion,
      row.precio,
      row.stock,
      row.categoria,
      row.fecha_creacion
    );
  }
}

module.exports = ProductRepositoryImpl;