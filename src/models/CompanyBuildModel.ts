import db from 'db';
import { Model, STRING, UUID, INTEGER } from 'sequelize';

class CompanyBuildModel extends Model {}

CompanyBuildModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: STRING,
      allowNull: false
    },
    price: {
      type: INTEGER,
      allowNull: false
    },
    tasks: {
      type: STRING
    },
    warranty: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: STRING,
      allowNull: false,
      defaultValue: 'relevant'
    }
  },
  {
    sequelize: db,
    modelName: 'CompanyBuild',
    tableName: 'company_builds',
    underscored: true
  }
);

export { CompanyBuildModel };
