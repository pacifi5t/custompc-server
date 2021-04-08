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
      field: 'user_id',
      allowNull: false
    },
    workerId: {
      type: UUID,
      field: 'worker_id',
      allowNull: false
    },
    managerId: {
      type: UUID,
      field: 'manager_id',
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
