import { SoftwareModel } from 'models';
import { v4 as uuidv4 } from 'uuid';

class SoftwareController {
  async create(type: string, name: string, price: number) {
    return await SoftwareModel.create({
      id: uuidv4(),
      type: type,
      name: name,
      price: price,
      description: ''
    });
  }

  async getByType(type: string) {
    return await SoftwareModel.findAll({
      where: { type }
    });
  }

  async get(id: string) {
    return await SoftwareModel.findOne({
      where: { id }
    });
  }
}

export default new SoftwareController();
