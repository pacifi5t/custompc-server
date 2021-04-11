import db from 'db';
import { Model, STRING, UUID, INTEGER } from 'sequelize';

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
      allowNull: false
    },
    buildId: {
      type: UUID,
      allowNull: false
    },
    stars: {
      type: INTEGER,
      allowNull: false
    },
    message: {
      type: STRING
    }
  },
  {
    sequelize: db,
    modelName: 'Rating',
    tableName: 'ratings',
    underscored: true
  }
);

export { RatingModel };
