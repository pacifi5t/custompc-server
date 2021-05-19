import { CustomBuildModel } from 'models';
import { v4 as uuidv4 } from 'uuid';
import db from 'db';
import {
  sqlCalculateAvgRating,
  sqlAllCustomBuilds,
  sqlCustomBuildParts,
  sqlCustomBuildSoftware
} from 'sql';
import { BuildType, updateBuildsToPartsTable } from 'utils';

class CustomBuildController {
  async create(
    authorId: string,
    name: string,
    price: number,
    warranty: number,
    image: string,
    status: string,
    parts: Array<string>
  ) {
    let result;
    const buildId = uuidv4();

    try {
      result = await CustomBuildModel.create({
        id: buildId,
        authorId: authorId,
        name: name,
        price: price,
        averageRating: null,
        tasks: null,
        warranty: warranty,
        image: image,
        status: status
      });
    } catch (e) {
      console.error(e);
    } finally {
      updateBuildsToPartsTable(BuildType.Custom, buildId, parts);
    }

    return result;
  }

  async update(
    id: string,
    authorId: string,
    name: string,
    price: number,
    averageRating: number,
    tasks: string,
    warranty: number,
    image: string,
    status: string,
    parts: Array<string>
  ) {
    let result;

    try {
      result = await CustomBuildModel.create({
        id: id,
        authorId: authorId,
        name: name,
        price: price,
        averageRating: averageRating,
        tasks: tasks,
        warranty: warranty,
        image: image,
        status: status
      });
    } catch (e) {
      console.error(e);
    } finally {
      updateBuildsToPartsTable(BuildType.Custom, id, parts);
    }

    return result;
  }

  async get(id: string) {
    return await CustomBuildModel.findByPk(id);
  }

  async getAll() {
    return db.query(sqlAllCustomBuilds);
  }

  async getCustomBuildParts(id: string) {
    return db.query(sqlCustomBuildParts, {
      replacements: { id: id }
    });
  }

  async getCustomBuildSoftware(id: string) {
    return db.query(sqlCustomBuildSoftware, {
      replacements: { id: id }
    });
  }

  async updateAverageRating(id: string) {
    return db.query(sqlCalculateAvgRating, {
      replacements: { id: id }
    });
  }

  async delete(id: string) {
    return await CustomBuildModel.destroy({ where: { id: id } });
  }
}

export default new CustomBuildController();
