import { Router, Request, Response, NextFunction } from 'express';
import partController from 'controllers/PartController';
import { ApiError } from 'ApiError';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { type, name, price, specsFile } = req.body;
  try {
    res.json(await partController.create(type, name, price, specsFile));
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID is incorrect or missing'));
  }
  try {
    res.json(await partController.get(id));
  } catch (err) {
    next(err);
  }
});

router.get('/type', async (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.query;
  if (typeof type !== 'string') {
    return next(ApiError.badRequest('Type is incorrect or missing'));
  }
  try {
    res.json(await partController.getByType(type));
  } catch (err) {
    next(err);
  }
});

export default router;
