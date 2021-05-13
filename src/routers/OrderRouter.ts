import { Router, Request, Response, NextFunction } from 'express';
import orderController from 'controllers/OrderController';
import { ApiError } from 'utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { userId, status } = req.body;
  return res.json(await orderController.create(userId, status));
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(await orderController.get(id));
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  const { userId, status } = req.body;
  return res.json(await orderController.update(id, userId, status));
});

router.get(
  '/contents',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await orderController.getOrderContent(id));
  }
);

export default router;
