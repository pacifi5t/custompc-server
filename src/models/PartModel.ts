import db from 'db';
import { Model, STRING, UUID, INTEGER, BOOLEAN } from 'sequelize';

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
      type: STRING,
      allowNull: false
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: INTEGER,
      allowNull: false
    },
    inStock: {
      type: BOOLEAN,
      allowNull: false
    },
    specsFile: {
      type: STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: db,
    modelName: 'Part',
    tableName: 'parts',
    timestamps: false,
    underscored: true
  }
);

export { PartModel };
