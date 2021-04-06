import db from 'db';
import { Model, UUID, INTEGER } from 'sequelize';

class ItemModel extends Model {}

ItemModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    cart_id: {
      type: UUID,
      allowNull: false
    },
    unit_id: {
      type: UUID,
      allowNull: false
    },
    quantity: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    sequelize: db,
    modelName: 'Item',
    tableName: 'items',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { ItemModel };
