import { CartModel } from './CartModel';
import { CompanyBuildModel } from './CompanyBuildModel';
import { CustomBuildModel } from './CustomBuildModel';
import { ItemModel } from './ItemModel';
import { OrderModel } from './OrderModel';
import { PartModel } from './PartModel';
import { RatingModel } from './RatingModel';
import { SoftwareModel } from './SoftwareModel';
import { TaskModel } from './TaskModel';
import { UserModel } from './UserModel';

CartModel.hasMany(ItemModel, { foreignKey: 'cart_id' });

CompanyBuildModel.hasMany(ItemModel, { foreignKey: 'company_build_id' });
CompanyBuildModel.belongsToMany(PartModel, {
  through: 'company_builds_parts',
  otherKey: 'part_id',
  foreignKey: 'company_build_id',
  timestamps: false
});
CompanyBuildModel.belongsToMany(SoftwareModel, {
  through: 'company_builds_software',
  otherKey: 'software_id',
  foreignKey: 'company_build_id',
  timestamps: false
});
CompanyBuildModel.hasOne(TaskModel, { foreignKey: 'company_build_id' });

CustomBuildModel.hasMany(ItemModel, { foreignKey: 'custom_build_id' });
CustomBuildModel.belongsToMany(PartModel, {
  through: 'custom_builds_parts',
  otherKey: 'part_id',
  foreignKey: 'custom_build_id',
  timestamps: false
});
CustomBuildModel.hasMany(RatingModel, { foreignKey: 'build_id' });
CustomBuildModel.belongsToMany(SoftwareModel, {
  through: 'custom_builds_software',
  otherKey: 'software_id',
  foreignKey: 'custom_build_id',
  timestamps: false
});

OrderModel.hasMany(ItemModel, { foreignKey: 'order_id' });

UserModel.hasOne(CartModel, { foreignKey: 'user_id' });
UserModel.hasMany(CustomBuildModel, { foreignKey: 'author_id' });
UserModel.hasMany(OrderModel, { foreignKey: 'user_id' });
UserModel.hasMany(RatingModel, { foreignKey: 'author_id' });

export {
  CartModel,
  CompanyBuildModel,
  CustomBuildModel,
  ItemModel,
  OrderModel,
  PartModel,
  RatingModel,
  SoftwareModel,
  TaskModel,
  UserModel
};
