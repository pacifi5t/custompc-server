import db from 'db';
import { Model, STRING, UUID } from 'sequelize';

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
    status: {
      type: STRING,
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
