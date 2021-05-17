import { CustomBuildModel } from 'models';
import { v4 as uuidv4 } from 'uuid';
import db from 'db';
import {
  sqlCalculateAvgRating,
  sqlCustomBuildFullInfo,
  sqlCustomBuildsAll,
  sqlCustomBuildParts,
  sqlCustomBuildSoftware
} from 'sql';

class CustomBuildController {
  async create(
    authorId: string,
    name: string,
    price: number,
    warranty: number,
    image: string,
    status: string
  ) {
    return await CustomBuildModel.create({
      id: uuidv4(),
      authorId: authorId,
      name: name,
      price: price,
      averageRating: null,
      tasks: null,
      warranty: warranty,
      image: image,
      status: status
    });
  }

  async get(id: string) {
    return await CustomBuildModel.findByPk(id);
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
    status: string
  ) {
    return await CustomBuildModel.create({
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
  }

  async getAll() {
    return db.query(sqlCustomBuildsAll);
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

  async getCustomBuildFullInfo(id: string) {
    return db.query(sqlCustomBuildFullInfo, {
      replacements: { id: id }
    });
  }

  async updateAverageRating(id: string) {
    return db.query(sqlCalculateAvgRating, {
      replacements: { id: id }
    });
  }

  async delete(id: string) {
    return await CustomBuildModel.destroy({where: {id: id}});
  }


}

export default new CustomBuildController() ;
