import { OrderModel } from 'models';
import { v4 as uuidv4 } from 'uuid';
import db from 'db';
import { sqlOrderContent } from 'sql';

class OrderController {
  async create(userId: string, status: string) {
    return await OrderModel.create({
      id: uuidv4(),
      userId: userId,
      status: status
    });
  }

  async get(id: string) {
    return await OrderModel.findByPk(id);
  }

  async update(id: string, userId: string, status: string) {
    return OrderModel.create({
      id: id,
      userId: userId,
      status: status
    });
  }

  async getOrderContent(id: string) {
    return await db.query(sqlOrderContent, {
      replacements: { id: id }
    });
  }
}

export default new OrderController();
