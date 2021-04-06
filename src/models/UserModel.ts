import db from 'db';
import { Model, TEXT, UUID } from 'sequelize';

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
      type: TEXT,
      allowNull: false,
      unique: true
    },
    email: {
      type: TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: TEXT,
      allowNull: false
    },
    role: {
      type: TEXT,
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
