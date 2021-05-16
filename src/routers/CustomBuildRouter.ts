import { Router, Request, Response, NextFunction } from 'express';
import customBuildController from 'controllers/CustomBuildController';
import { ApiError } from 'utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { authorId, name, price, warranty, image, status } = req.body;
  return res.json(
    await customBuildController.create(authorId, name, price, warranty, image, status)
  );
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(await customBuildController.get(id));
});

router.put('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/upd');
  }
  const { authorId, name, price, averageRating, tasks, warranty, image, status } =
    req.body;
  return res.json(
    await customBuildController.update(
      id,
      authorId,
      name,
      price,
      averageRating,
      tasks,
      warranty,
      image,
      status
    )
  );
});

router.get('/info', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(await customBuildController.getCustomBuildInfo(id));
});

router.get(
  '/parts',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await customBuildController.getCustomBuildParts(id));
  }
);

router.get(
  '/software',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await customBuildController.getCustomBuildSoftware(id));
  }
);

router.get(
  '/fullinfo',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await customBuildController.getCustomBuildFullInfo(id));
  }
);

router.put(
  '/rating',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await customBuildController.updateAverageRating(id));
  }
);

export default router;
