import { Router, Request, Response, NextFunction } from 'express';
import orderController from 'controllers/OrderController';
import { ApiError } from 'ApiError';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, status } = req.body;
  try {
    res.json(await orderController.create(userId, status));
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  try {
    res.json(await orderController.get(id));
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  const { userId, status } = req.body;
  try {
    res.json(await orderController.update(id, userId, status));
  } catch (err) {
    next(err);
  }
});

router.get(
  '/contents',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    try {
      res.json(await orderController.getOrderContent(id));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
