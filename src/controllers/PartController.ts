import { PartModel } from 'models';
import { v4 as uuidv4 } from 'uuid';

class PartController {
  async create(type: string, name: string, price: number, specsFile: string) {
    return await PartModel.create({
      id: uuidv4(),
      type: type,
      name: name,
      price: price,
      inStock: true,
      image: '',
      specsFile: specsFile
    });
  }

  async get(id: string) {
    return await PartModel.findOne({
      where: { id }
    });
  }

  async getByType(type: string) {
    return await PartModel.findAll({
      where: { type }
    });
  }
}

export default new PartController();
