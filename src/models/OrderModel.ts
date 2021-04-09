import db from 'db';
import { Model, TEXT, UUID } from 'sequelize';

class OrderModel extends Model {}

OrderModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    userId: {
      type: UUID,
      allowNull: false
    },
    workerId: {
      type: UUID,
      allowNull: false
    },
    managerId: {
      type: UUID,
      allowNull: false
    },
    status: {
      type: TEXT,
      allowNull: false,
      defaultValue: 'pending'
    }
  },
  {
    sequelize: db,
    modelName: 'Order',
    tableName: 'orders',
    underscored: true
  }
);

export { OrderModel };
