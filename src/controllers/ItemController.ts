import { ItemModel } from 'models';
import { v4 as uuidv4 } from 'uuid';
import { BuildType } from 'utils';
import db from 'db';
import { sqlItemCompanyBuildInfo, sqlItemCustomBuildInfo } from 'sql';

class ItemController {
  async create(
    cartId: string,
    orderId: string,
    buildId: string,
    quantity: number,
    buildType: BuildType
  ) {
    if (buildType == BuildType.Custom) {
      return await ItemModel.create({
        id: uuidv4(),
        cartId: cartId,
        orderId: orderId,
        customBuildId: buildId,
        companyBuildId: null,
        quantity: quantity
      });
    } else {
      return await ItemModel.create({
        id: uuidv4(),
        cartId: cartId,
        orderId: orderId,
        customBuildId: null,
        companyBuildId: buildId,
        quantity: quantity
      });
    }
  }

  async update(
    id: string,
    cartId: string,
    orderId: string,
    buildId: string,
    quantity: number,
    buildType: BuildType
  ) {
    if (buildType == BuildType.Custom) {
      return await ItemModel.create({
        id: id,
        cartId: cartId,
        orderId: orderId,
        customBuildId: buildId,
        companyBuildId: null,
        quantity: quantity
      });
    } else {
      return await ItemModel.create({
        id: id,
        cartId: cartId,
        orderId: orderId,
        customBuildId: null,
        companyBuildId: buildId,
        quantity: quantity
      });
    }
  }

  async get(id: string) {
    return await ItemModel.findByPk(id);
  }

  async getItemCustomBuildInfo(id: string) {
    return await db.query(sqlItemCustomBuildInfo, {
      replacements: { id: id }
    });
  }

  async getItemCompanyBuildInfo(id: string) {
    return await db.query(sqlItemCompanyBuildInfo, {
      replacements: { id: id }
    });
  }
}

export default new ItemController();
