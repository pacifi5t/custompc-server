import db from 'db';
import { Model, TEXT, UUID } from 'sequelize';

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
      type: TEXT,
      allowNull: false
    },
    content: {
      type: TEXT,
      allowNull: false
    },
    image: {
      type: TEXT,
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
