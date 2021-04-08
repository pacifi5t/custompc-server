import db from 'db';
import { Model, TEXT, UUID, INTEGER } from 'sequelize';

class RatingModel extends Model {}

RatingModel.init(
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
    buildId: {
      type: UUID,
      field: 'build_id',
      allowNull: false
    },
    stars: {
      type: INTEGER,
      allowNull: false
    },
    message: {
      type: TEXT
    }
  },
  {
    sequelize: db,
    modelName: 'Rating',
    tableName: 'ratings',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { RatingModel };
