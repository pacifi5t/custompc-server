import db from 'db';
import { Model, UUID } from 'sequelize';

class CartModel extends Model {}

CartModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    userId: {
      type: UUID,
      field: 'user_id',
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: false
  }
);

export { CartModel };
