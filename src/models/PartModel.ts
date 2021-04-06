import db from 'db';
import { Model, TEXT, UUID, INTEGER } from 'sequelize';

class PartModel extends Model {}

PartModel.init(
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
    specs_file: {
      type: TEXT,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: db,
    modelName: 'Part',
    tableName: 'parts',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { PartModel };
