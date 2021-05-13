import { Router, Request, Response, NextFunction } from 'express';
import itemController from 'controllers/ItemController';
import { BuildType } from 'utils';
import { ApiError } from 'utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { cartId, orderId, buildId, quantity, buildType } = req.body;
  if (buildType == 'Custom') {
    return res.json(
      await itemController.create(
        cartId,
        orderId,
        buildId,
        quantity,
        BuildType.Custom
      )
    );
  } else {
    return res.json(
      await itemController.create(
        cartId,
        orderId,
        buildId,
        quantity,
        BuildType.Company
      )
    );
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return next(ApiError.badRequest('ID incorrect or missing'));
  }
  return res.json(await itemController.get(id));
});

router.put('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/upd');
  }
  const { cartId, orderId, buildId, quantity, buildType } = req.body;
  if (buildType == 'Custom') {
    return res.json(
      await itemController.update(
        id,
        cartId,
        orderId,
        buildId,
        quantity,
        BuildType.Custom
      )
    );
  } else {
    return res.json(
      await itemController.update(
        id,
        cartId,
        orderId,
        buildId,
        quantity,
        BuildType.Company
      )
    );
  }
});

router.get(
  '/custombuilds',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await itemController.getItemCustomBuildInfo(id));
  }
);

router.get(
  '/companybuilds',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return next(ApiError.badRequest('ID incorrect or missing'));
    }
    return res.json(await itemController.getItemCompanyBuildInfo(id));
  }
);

export default router;
