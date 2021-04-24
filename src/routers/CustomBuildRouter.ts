import { Router, Request, Response, NextFunction } from 'express';
import customBuildController from 'controllers/CustomBuildController';
import { ApiError } from 'utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { authorId, price, warranty, image, status } = req.body;
  return res.json(
    customBuildController.create(authorId, price, warranty, image, status)
  );
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(customBuildController.get(id));
});

router.put('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/upd');
  }
  const {
    authorId,
    price,
    averageRating,
    tasks,
    warranty,
    image,
    status
  } = req.body;
  return res.json(
    customBuildController.update(
      id,
      authorId,
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
  return res.json(customBuildController.getCustomBuildInfo(id));
});

router.get(
  '/parts',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(customBuildController.getCustomBuildParts(id));
  }
);

router.get(
  '/software',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(customBuildController.getCustomBuildSoftware(id));
  }
);

router.get(
  '/fullinfo',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(customBuildController.getCustomBuildFullInfo(id));
  }
);

router.put(
  '/rating',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(customBuildController.updateAverageRating(id));
  }
);

export default router;
