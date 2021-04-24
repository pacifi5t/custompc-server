import { Router, Request, Response, NextFunction } from 'express';
import companyBuildController from 'controllers/CompanyBuildController';
import { ApiError } from 'utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { price, warranty, image, status } = req.body;
  return res.json(
    companyBuildController.create(price, warranty, image, status)
  );
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(companyBuildController.get(id));
});

router.put('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/upd');
  }
  const { price, tasks, warranty, image, status } = req.body;
  return res.json(
    companyBuildController.update(id, price, tasks, warranty, image, status)
  );
});

router.get('/info', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(companyBuildController.getCompanyBuildInfo(id));
});

router.get(
  '/parts',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(companyBuildController.getCompanyBuildParts(id));
  }
);

router.get(
  '/software',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(companyBuildController.getCompanyBuildSoftware(id));
  }
);

router.get(
  '/fullinfo',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(companyBuildController.getCompanyBuildFullInfo(id));
  }
);

export default router;
