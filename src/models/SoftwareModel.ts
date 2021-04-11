import db from 'db';
import { Model, STRING, UUID, INTEGER } from 'sequelize';

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
    image: {
      type: STRING,
      allowNull: false
    },
    description: {
      type: STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Software',
    tableName: 'software',
    timestamps: false,
    underscored: true
  }
);

export { SoftwareModel };
