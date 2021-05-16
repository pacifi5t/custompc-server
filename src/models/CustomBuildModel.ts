import db from 'db';
import { Model, STRING, UUID, INTEGER, FLOAT } from 'sequelize';

class CustomBuildModel extends Model {}

CustomBuildModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    authorId: {
      type: UUID,
      allowNull: false
    },
    name: {
      type: STRING,
      allowNull: false
    },
    price: {
      type: INTEGER,
      allowNull: false
    },
    averageRating: {
      type: FLOAT
    },
    tasks: {
      type: STRING
    },
    warranty: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    image: {
      type: STRING,
      allowNull: false
    },
    status: {
      type: STRING,
      allowNull: false,
      defaultValue: 'relevant'
    }
  },
  {
    sequelize: db,
    modelName: 'CustomBuild',
    tableName: 'custom_builds',
    underscored: true
  }
);

export { CustomBuildModel };
