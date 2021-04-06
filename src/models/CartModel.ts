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
    user_id: {
      type: UUID,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Cart',
    tableName: 'carts',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { CartModel };
