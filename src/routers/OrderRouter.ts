import { Router, Request, Response } from 'express';
import orderController from 'controllers/OrderController';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { userId, status } = req.body;
  return res.json(orderController.create(userId, status));
});

router.get('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/ordl');
  }
  return res.json(orderController.get(id));
});

router.put('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/ordl');
  }
  const { userId, status } = req.body;
  return res.json(orderController.update(id, userId, status));
});

router.get('/contents', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/ordl');
  }
  return res.json(orderController.getOrderContent(id));
})

export default router;