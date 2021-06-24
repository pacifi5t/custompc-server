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
    cartId: {
      type: UUID,
      onDelete: 'SET NULL'
    },
    orderId: {
      type: UUID
    },
    customBuildId: {
      type: UUID
    },
    companyBuildId: {
      type: UUID
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
    timestamps: false,
    underscored: true
  }
);

export { ItemModel };
