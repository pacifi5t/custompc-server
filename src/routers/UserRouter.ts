import { Router, Request, Response, NextFunction } from 'express';
import userController from 'controllers/UserController';
import { ApiError } from 'ApiError';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, role } = req.body;
  try {
    res.json(await userController.create(username, email, password, role));
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { username, email } = req.query;
  if (typeof username !== 'string' || typeof email !== 'string') {
    return next(ApiError.badRequest('Invalid username or email'));
  }
  try {
    res.json(await userController.get(username, email));
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  const { username, email, password, role } = req.body;
  try {
    res.json(await userController.update(id, username, email, password, role));
  } catch (err) {
    next(err);
  }
});

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  try {
    res.json(await userController.delete(id));
  } catch (err) {
    next(err);
  }
});

router.get(
  '/orders',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    try {
      res.json(await userController.getUserInfoAndOrderList(id));
    } catch (err) {
      next(err);
    }
  }
);

router.get('/cart', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  try {
    res.json(await userController.getUserCart(id));
  } catch (err) {
    next(err);
  }
});

router.get(
  '/cart/content',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    try {
      res.json(await userController.getUserCartAndContent(id));
    } catch (err) {
      next(err);
    }
  }
);

router.get('/auth', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.query;
  if (typeof email !== 'string' || typeof password !== 'string') {
    return next(ApiError.badRequest('Incorrect data'));
  }
  try {
    res.json(await userController.auth(email, password, next));
  } catch (err) {
    next(err);
  }
});

export default router;
