import { CompanyBuildModel, UserModel } from 'models';
import { v4 as uuidv4 } from 'uuid';
import db from 'db';
import {
  sqlAllCompanyBuilds,
  sqlCompanyBuildParts,
  sqlCompanyBuildSoftware
} from 'sql';
import { BuildType, updateBuildsToPartsTable } from 'utils';

class CompanyBuildController {
  async create(
    name: string,
    price: number,
    warranty: number,
    status: string,
    parts: Array<string>
  ) {
    let result;
    const buildId = uuidv4();

    try {
      result = await CompanyBuildModel.create({
        id: buildId,
        name: name,
        price: price,
        tasks: null,
        warranty: warranty,
        status: status
      });
    } catch (e) {
      console.error(e);
    } finally {
      updateBuildsToPartsTable(BuildType.Company, buildId, parts);
    }

    return result;
  }

  async update(
    id: string,
    name: string,
    price: number,
    tasks: string,
    warranty: number,
    status: string,
    parts: Array<string>
  ) {
    let result;

    try {
      result = await CompanyBuildModel.create({
        id: id,
        name: name,
        price: price,
        tasks: tasks,
        warranty: warranty,
        status: status
      });
    } catch (e) {
      console.error(e);
    } finally {
      updateBuildsToPartsTable(BuildType.Company, id, parts);
    }

    return result;
  }

  async get(id: string) {
    return await UserModel.findByPk(id);
  }

  async getAll() {
    return db.query(sqlAllCompanyBuilds);
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

  async delete(id: string) {
    return await CompanyBuildModel.destroy({ where: { id: id } });
  }
}

export default new CompanyBuildController();
