import { Router, Request, Response, NextFunction } from 'express';
import userController from 'controllers/UserController';
import { ApiError } from 'utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  return res.json(await userController.create(username, email, password, role));
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { username, email } = req.query;
  if (typeof username !== 'string' || typeof email !== 'string') {
    return next(ApiError.badRequest('Invalid username or email'));
  }
  return res.json(await userController.get(username, email));
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  const { username, email, password, role } = req.body;
  return res.json(
    await userController.update(id, username, email, password, role)
  );
});

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(await userController.delete(id));
});

router.get(
  '/orders',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await userController.getUserInfoAndOrderList(id));
  }
);

router.get('/cart', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(await userController.getUserCartAndContent(id));
});

router.get('/auth', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.query;
  if (typeof email !== 'string' || typeof password !== 'string') {
    return next(ApiError.badRequest('Incorrect data'));
  }
  return res.json(await userController.auth(email, password, next));
});

export default router;
