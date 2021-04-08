import db from 'db';
import { Model, TEXT, UUID, INTEGER } from 'sequelize';

class WorkerModel extends Model {}

WorkerModel.init(
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
      allowNull: false,
      unique: true
    },
    name: {
      type: TEXT,
      allowNull: false,
      unique: true
    },
    salary: {
      type: INTEGER,
      allowNull: false
    },
    status: {
      type: TEXT,
      allowNull: false,
      defaultValue: 'working'
    }
  },
  {
    sequelize: db,
    modelName: 'Worker',
    tableName: 'workers',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { WorkerModel };
