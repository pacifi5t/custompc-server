import { Router, Request, Response, NextFunction } from 'express';
import companyBuildController from 'controllers/CompanyBuildController';
import { ApiError } from 'utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, price, warranty, status, parts } = req.body;
  return res.json(
    await companyBuildController.create(name, price, warranty, status, parts)
  );
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(await companyBuildController.get(id));
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  const { name, price, tasks, warranty, status, parts } = req.body;
  return res.json(
    await companyBuildController.update(
      id,
      name,
      price,
      tasks,
      warranty,
      status,
      parts
    )
  );
});

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(await companyBuildController.getAll());
});

router.get(
  '/parts',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await companyBuildController.getCompanyBuildParts(id));
  }
);

router.get(
  '/software',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await companyBuildController.getCompanyBuildSoftware(id));
  }
);

export default router;
