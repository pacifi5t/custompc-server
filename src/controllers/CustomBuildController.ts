import { CustomBuildModel, UserModel } from 'models';
import { v4 as uuidv4 } from 'uuid';
import db from 'db';
import {
  sqlCalculateAvgRating,
  sqlCustomBuildFullInfo,
  sqlCustomBuildInfo,
  sqlCustomBuildParts,
  sqlCustomBuildSoftware
} from 'sql';

class CustomBuildController {
  async create(
    authorId: string,
    price: number,
    warranty: number,
    image: string,
    status: string
  ) {
    return await CustomBuildModel.create({
      id: uuidv4(),
      authorId: authorId,
      price: price,
      averageRating: null,
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
    authorId: string,
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
      price: price,
      averageRating: averageRating,
      tasks: tasks,
      warranty: warranty,
      image: image,
      status: status
    });
  }

  async getCustomBuildInfo(id: string) {
    return db.query(sqlCustomBuildInfo, {
      replacements: { id: id }
    });
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
}

export default new CustomBuildController() ;
