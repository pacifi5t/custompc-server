import { CompanyBuildModel, UserModel } from 'models';
import { v4 as uuidv4 } from 'uuid';
import db from 'db';
import {
  sqlAllCompanyBuilds,
  sqlCompanyBuildParts,
  sqlCompanyBuildSoftware
} from 'sql';
import {
  BuildType,
  updateBuildsToPartsTable,
  updateSoftwareToPartsTable
} from 'utils';

class CompanyBuildController {
  async create(
    name: string,
    price: number,
    tasks: string,
    warranty: number,
    status: string,
    parts: Array<string> | Array<Array<string>>,
    soft: Array<string>
  ) {
    let result;
    const buildId = uuidv4();

    try {
      result = await CompanyBuildModel.create({
        id: buildId,
        name: name,
        price: price,
        tasks: tasks,
        warranty: warranty,
        status: status
      });
    } catch (e) {
      console.error(e);
    } finally {
      const tempArr = new Array<string>();

      for (const elem of parts) {
        if (typeof elem === 'string') {
          tempArr.push(elem);
        } else {
          elem.forEach((val) => tempArr.push(val));
        }
      }
      updateBuildsToPartsTable(BuildType.Company, buildId, tempArr);
      updateSoftwareToPartsTable(BuildType.Company, buildId, soft);
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
    return await CompanyBuildModel.update(
      { status: 'removed' },
      { where: { id: id } }
    );
  }
}

export default new CompanyBuildController();
