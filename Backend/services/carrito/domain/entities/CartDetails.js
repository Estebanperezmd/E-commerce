const { EntitySchema } = require('typeorm');

const CartDetail = new EntitySchema({
  name: 'CartDetail',
  tableName: 'detalle_carrito',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    id_carrito: {
      type: 'int',
      nullable: false,
    },
    id_producto: {
      type: 'int',
      nullable: false,
    },
    cantidad: {
      type: 'int',
      default: 1,
    },
    id_usuario: {
      type: 'int',
      nullable: true,
    },
    confirmado: {
      type: 'boolean',
      default: false,
    },
  },
  relations: {
    carrito: {
      type: 'many-to-one',
      target: 'Cart',
      joinColumn: { name: 'id_carrito' },
      onDelete: 'CASCADE',
    },
  },
});

module.exports = CartDetail;
