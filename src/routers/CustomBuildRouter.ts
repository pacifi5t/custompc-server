import { Router, Request, Response, NextFunction } from 'express';
import customBuildController from 'controllers/CustomBuildController';
import { ApiError } from 'ApiError';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { authorId, name, price, warranty, status, parts, soft } = req.body;
  try {
    res.json(
      await customBuildController.create(
        authorId,
        name,
        price,
        warranty,
        status,
        parts,
        soft
      )
    );
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
    res.json(await customBuildController.get(id));
  } catch (err) {
    next(err);
  }
});

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await customBuildController.getAll());
  } catch (err) {
    next(err);
  }
});

router.get(
  '/parts',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    try {
      res.json(await customBuildController.getCustomBuildParts(id));
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/software',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    try {
      res.json(await customBuildController.getCustomBuildSoftware(id));
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/rating',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    try {
      res.json(await customBuildController.updateAverageRating(id));
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  try {
    res.json(await customBuildController.delete(id));
  } catch (err) {
    next(err);
  }
});

router.post('/pdf', async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    price,
    tasks,
    warranty,
    parts,
    soft
  } = req.body;
  try {
    res.json(await customBuildController.createPdf(name, price, tasks, warranty, parts, soft));
  } catch (err) {
    next(err);
  }
});

router.post('/rating', async (req: Request, res: Response, next: NextFunction) => {
  const {buildId, value, authorId, message} = req.body;
  try {
    res.json(await customBuildController.leaveRating(buildId, value, authorId, message));
  } catch (err) {
    next(err);
  }
});

export default router;
