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
    manager_id: {
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
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { NewsModel };
