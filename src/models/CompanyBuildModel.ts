import db from 'db';
import { Model, TEXT, UUID, INTEGER } from 'sequelize';

class CompanyBuildModel extends Model {}

CompanyBuildModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    price: {
      type: INTEGER,
      allowNull: false
    },
    tasks: {
      type: TEXT
    },
    warranty: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    image: {
      type: TEXT,
      allowNull: false
    },
    status: {
      type: TEXT,
      allowNull: false,
      defaultValue: 'relevant'
    }
  },
  {
    sequelize: db,
    modelName: 'CompanyBuild',
    tableName: 'company_builds',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { CompanyBuildModel };
