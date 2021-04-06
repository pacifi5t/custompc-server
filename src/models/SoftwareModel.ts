import db from 'db';
import { Model, TEXT, UUID, INTEGER } from 'sequelize';

class SoftwareModel extends Model {}

SoftwareModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    type: {
      type: TEXT,
      allowNull: false
    },
    name: {
      type: TEXT,
      allowNull: false,
      unique: true
    },
    price: {
      type: INTEGER,
      allowNull: false
    },
    image: {
      type: TEXT,
      allowNull: false
    },
    description: {
      type: TEXT,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Software',
    tableName: 'software',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { SoftwareModel };
