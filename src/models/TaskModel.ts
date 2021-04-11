import db from 'db';
import { Model, STRING, UUID } from 'sequelize';

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
      type: STRING,
      allowNull: false,
      unique: true
    },
    buildId: {
      type: UUID,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: false,
    underscored: true
  }
);

export { TaskModel };
