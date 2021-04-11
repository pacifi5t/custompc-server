import db from 'db';
import { Model, STRING, UUID } from 'sequelize';

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: STRING,
      allowNull: false
    },
    role: {
      type: STRING,
      allowNull: false,
      defaultValue: 'customer'
    }
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { UserModel };
