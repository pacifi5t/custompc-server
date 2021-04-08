import db from 'db';
import { Model, TEXT, UUID } from 'sequelize';

class TaskModel extends Model {}

TaskModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: TEXT,
      allowNull: false,
      unique: true
    },
    buildId: {
      type: UUID,
      field: 'build_id',
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Task',
    tableName: 'tasks',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { TaskModel };
