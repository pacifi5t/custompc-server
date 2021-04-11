import db from 'db';
import { Model, STRING, UUID, INTEGER } from 'sequelize';

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
      allowNull: false,
      unique: true
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    salary: {
      type: INTEGER,
      allowNull: false
    },
    status: {
      type: STRING,
      allowNull: false,
      defaultValue: 'working'
    }
  },
  {
    sequelize: db,
    modelName: 'Worker',
    tableName: 'workers',
    timestamps: false,
    underscored: true
  }
);

export { WorkerModel };
