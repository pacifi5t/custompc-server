import { CompanyBuildModel, UserModel } from 'models';
import { v4 as uuidv4 } from 'uuid';
import db from 'db';
import {
  sqlCompanyBuildFullInfo,
  sqlCompanyBuildInfo,
  sqlCompanyBuildParts,
  sqlCompanyBuildSoftware
} from 'sql';

class CompanyBuildController {
  async create(
    price: number,
    warranty: number,
    image: string,
    status: string
  ) {
    return await CompanyBuildModel.create({
      id: uuidv4(),
      price: price,
      tasks: null,
      warranty: warranty,
      image: image,
      status: status
    });
  }

  async get(id: string) {
    return await UserModel.findByPk(id);
  }

  async update(
    id: string,
    price: number,
    tasks: string,
    warranty: number,
    image: string,
    status: string
  ) {
    return await CompanyBuildModel.create({
      id: id,
      price: price,
      tasks: tasks,
      warranty: warranty,
      image: image,
      status: status
    });
  }

  async getCompanyBuildInfo(id: string) {
    return db.query(sqlCompanyBuildInfo, {
      replacements: { id: id }
    });
  }

  async getCompanyBuildParts(id: string) {
    return db.query(sqlCompanyBuildParts, {
      replacements: { id: id }
    });
  }

  async getCompanyBuildSoftware(id: string) {
    return db.query(sqlCompanyBuildSoftware, {
      replacements: { id: id }
    });
  }

  async getCompanyBuildFullInfo(id: string) {
    return db.query(sqlCompanyBuildFullInfo, {
      replacements: { id: id }
    });
  }
}

export default new CompanyBuildController() ;
