import db from 'db';
import { Model, UUID, INTEGER } from 'sequelize';

class ItemModel extends Model {}

ItemModel.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    cartId: {
      type: UUID,
      field: 'cart_id',
      onDelete: 'SET NULL'
    },
    orderId: {
      type: UUID,
      field: 'order_id'
    },
    customBuildId: {
      type: UUID,
      field: 'custom_build_id'
    },
    companyBuildId: {
      type: UUID,
      field: 'company_build_id'
    },
    quantity: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    sequelize: db,
    modelName: 'Item',
    tableName: 'items',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    validate: {
      hasOnlyOneBuildId() {
        if (this.customBuildId === null && this.companyBuildId === null) {
          throw new Error(`None of build_id's were assigned!`);
        }
        if (this.customBuildId !== null && this.companyBuildId !== null) {
          throw new Error(`Both of build_id's were assigned!`);
        }
      }
    }
  }
);

export { ItemModel };
