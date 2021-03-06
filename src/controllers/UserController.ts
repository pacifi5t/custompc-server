import { UserModel, CartModel } from 'models';
import { sqlUserOrderList, sqlUserCartAndContent, sqlUserCart } from 'sql';
import { generateJwt } from 'utils';
import { ApiError } from 'ApiError';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { NextFunction } from 'express';
import { Op } from 'sequelize';
import db from 'db';

class UserController {
  async create(
    username: string,
    email: string,
    password: string,
    role: string
  ) {
    let result;
    let uid;
    try {
      uid = uuidv4();
      result = await UserModel.create({
        id: uid,
        username: username,
        email: email,
        password: await hash(password, 5),
        role: role
      });
    } finally {
      await CartModel.create({ id: uuidv4(), userId: uid });
    }
    return result;
  }

  async update(
    id: string,
    username: string,
    email: string,
    password: string,
    role: string
  ) {
    return await UserModel.create({
      id: id,
      username: username,
      email: email,
      password: await hash(password, 5),
      role: role
    });
  }

  async get(username: string, email: string) {
    return await UserModel.findOne({
      where: { [Op.or]: [{ username }, { email }] }
    });
  }

  async getUserCart(id: string) {
    return (
      await db.query(sqlUserCart, {
        replacements: { id: id }
      })
    )[0];
  }

  async getUserInfoAndOrderList(id: string) {
    return (await db.query(sqlUserOrderList, {
      replacements: { id: id }
    }))[0];
  }

  async getUserCartAndContent(id: string) {
    return (
      await db.query(sqlUserCartAndContent, {
        replacements: { id: id }
      })
    )[0];
  }

  async auth(email: string, pass: string, next: NextFunction) {
    const user = await UserModel.findOne({
      where: { email: email }
    });
    if (!user) {
      return next(ApiError.notFound('Cannot find user'));
    }
    const match = await compare(pass, user.getDataValue('password'));
    if (!match) {
      return next(ApiError.unauthorized('Wrong password'));
    }

    const id = user.getDataValue('id');
    const role = user.getDataValue('role');
    return [id, user.getDataValue('username'), role, generateJwt(id, role)];
  }

  async delete(id: string) {
    return await UserModel.destroy({ where: { id } });
  }
}

export default new UserController();
