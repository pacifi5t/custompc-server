import { UserModel } from 'models';
import { sqlUserInfoAndOrderList, sqlUserCartAndContent } from 'sql';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import db from 'db';

class UserController {
  async create(
    username: string,
    email: string,
    password: string,
    role: string
  ) {
    return await UserModel.create({
      id: uuidv4(),
      username: username,
      email: email,
      password: await hash(password, 5),
      role: role
    });
  }

  async get(id: string) {
    return await UserModel.findByPk(id);
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

  async delete(id: string) {
    return await UserModel.destroy({ where: { id } });
  }

  async getUserInfoAndOrderList(id: string) {
    return await db.query(sqlUserInfoAndOrderList, {
      replacements: { id: id }
    });
  }

  async getUserCartAndContent(id: string) {
    return await db.query(sqlUserCartAndContent, {
      replacements: { id: id }
    });
  }
}

export default new UserController();
