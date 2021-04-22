import { Router, Request, Response } from 'express';
import userController from 'controllers/UserController';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  return res.json(userController.create(username, email, password, role));
});

router.get('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/ordl');
  }
  return res.json(userController.get(id));
});

router.put('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/upd');
  }
  const { username, email, password, role } = req.body;
  return res.json(userController.update(id, username, email, password, role));
});

router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/del');
  }
  return res.json(userController.delete(id));
});

router.get('/orders', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/ordl');
  }
  return res.json(userController.getUserInfoAndOrderList(id));
});

export default router;
