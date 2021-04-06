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
    author_id: {
      type: UUID,
      allowNull: false
    },
    build_id: {
      type: UUID,
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
