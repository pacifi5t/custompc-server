import { Router, Request, Response, NextFunction } from 'express';
import companyBuildController from 'controllers/CompanyBuildController';
import { ApiError } from 'ApiError';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { name, price, warranty, status, parts, soft } = req.body;
  try {
    res.json(
      await companyBuildController.create(
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
    res.json(await companyBuildController.get(id));
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  const { name, price, tasks, warranty, status, parts, soft } = req.body;
  try {
    res.json(
      await companyBuildController.update(
        id,
        name,
        price,
        tasks,
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

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  try {
    res.json(await companyBuildController.getAll());
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
      res.json(await companyBuildController.getCompanyBuildParts(id));
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
      res.json(await companyBuildController.getCompanyBuildSoftware(id));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
