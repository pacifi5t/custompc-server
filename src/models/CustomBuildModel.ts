import db from 'db';
import { Model, TEXT, UUID, INTEGER, FLOAT } from 'sequelize';

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
      field: 'author_id',
      allowNull: false
    },
    price: {
      type: INTEGER,
      allowNull: false
    },
    averageRating: {
      type: FLOAT,
      field: 'average_rating'
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
    modelName: 'CustomBuild',
    tableName: 'custom_builds',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { CustomBuildModel };
