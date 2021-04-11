import db from 'db';
import { Model, STRING, UUID } from 'sequelize';

class NewsModel extends Model {}

NewsModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    managerId: {
      type: UUID,
      allowNull: false
    },
    title: {
      type: STRING,
      allowNull: false
    },
    content: {
      type: STRING,
      allowNull: false
    },
    image: {
      type: STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'News',
    tableName: 'news',
    underscored: true
  }
);

export { NewsModel };
