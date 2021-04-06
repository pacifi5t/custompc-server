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
    user_id: {
      type: UUID,
      allowNull: false
    },
    worker_id: {
      type: UUID,
      allowNull: false
    },
    manager_id: {
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
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { OrderModel };
