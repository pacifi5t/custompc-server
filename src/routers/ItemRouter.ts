import { Router, Request, Response, NextFunction } from 'express';
import itemController from 'controllers/ItemController';
import { BuildType } from 'utils';
import { ApiError } from 'ApiError';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { cartId, orderId, buildId, quantity, buildType } = req.body;
  const tempType = buildType == 'Custom' ? BuildType.Custom : BuildType.Company;
  try {
    res.json(
      await itemController.create(cartId, orderId, buildId, quantity, tempType)
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
    res.json(await itemController.get(id));
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  const { cartId, orderId, buildId, quantity, buildType } = req.body;
  const tempType = buildType == 'Custom' ? BuildType.Custom : BuildType.Company;
  try {
    res.json(
      await itemController.update(
        id,
        cartId,
        orderId,
        buildId,
        quantity,
        tempType
      )
    );
  } catch (err) {
    next(err);
  }
});

router.get(
  '/custombuilds',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    try {
      res.json(await itemController.getItemCustomBuildInfo(id));
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/companybuilds',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    try {
      res.json(await itemController.getItemCompanyBuildInfo(id));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
