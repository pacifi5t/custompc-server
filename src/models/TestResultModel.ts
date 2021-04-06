import db from 'db';
import { Model, TEXT, UUID } from 'sequelize';

class TestResultModel extends Model {}

TestResultModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    build_id: {
      type: UUID,
      allowNull: false
    },
    result_file: {
      type: TEXT,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: db,
    modelName: 'TestResult',
    tableName: 'test_results',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { TestResultModel };
