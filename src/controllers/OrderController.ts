import { OrderModel, CartModel, ItemModel } from 'models';
import { v4 as uuidv4 } from 'uuid';
import db from 'db';
import { sqlOrderContent } from 'sql';

class OrderController {
  async create(userId: string, status: string) {
    const orderId = uuidv4();
    const cart = await CartModel.findOne({ where: { userId: userId } });

    if (cart === null) {
      throw new Error('Cart not found');
    }

    const cartId = cart.getDataValue('id');
    await OrderModel.create({
      id: orderId,
      userId: userId,
      status: status
    });
    await ItemModel.update(
      { orderId: orderId },
      {
        where: { cartId: cartId }
      }
    );
    await CartModel.destroy({ where: { userId: userId } });
    await CartModel.create({ id: uuidv4(), userId: userId });

    return;
  }

  async update(id: string, userId: string, status: string) {
    return OrderModel.create({
      id: id,
      userId: userId,
      status: status
    });
  }

  async get(id: string) {
    return await OrderModel.findByPk(id);
  }

  async getOrderContent(id: string) {
    return await db.query(sqlOrderContent, {
      replacements: { id: id }
    });
  }
}

export default new OrderController();
