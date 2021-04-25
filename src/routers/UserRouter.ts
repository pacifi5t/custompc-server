import { Router, Request, Response, NextFunction } from 'express';
import userController from 'controllers/UserController';
import { ApiError } from 'utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  return res.json(userController.create(username, email, password, role));
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
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

router.get(
  '/orders',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(userController.getUserInfoAndOrderList(id));
  }
);

router.get('/cart', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(userController.getUserCartAndContent(id));
});

router.get('/auth', async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.query;
  if (typeof email !== 'string' || typeof password !== 'string') {
    return next(ApiError.badRequest('Incorrect data'));
  }
  return res.json(userController.auth(email, password, next));
});

export default router;
