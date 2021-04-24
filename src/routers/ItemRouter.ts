import { Router, Request, Response } from 'express';
import itemController from 'controllers/ItemController';
import { BuildType } from 'utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { cartId, orderId, buildId, quantity, buildType } = req.body;
  if (buildType == 'Custom') {
    return res.json(
      itemController.create(
        cartId,
        orderId,
        buildId,
        quantity,
        BuildType.Custom
      )
    );
  } else {
    return res.json(
      itemController.create(
        cartId,
        orderId,
        buildId,
        quantity,
        BuildType.Company
      )
    );
  }
});

router.get('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/ordl');
  }
  return res.json(itemController.get(id));
});

router.put('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/upd');
  }
  const { cartId, orderId, buildId, quantity, buildType } = req.body;
  if (buildType == 'Custom') {
    return res.json(
      itemController.update(
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
      itemController.update(
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

router.get('/custombuilds', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/ordl');
  }
  return res.json(itemController.getItemCustomBuildInfo(id));
});

router.get('/companybuilds', async (req: Request, res: Response) => {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return new Error('uc/ordl');
  }
  return res.json(itemController.getItemCompanyBuildInfo(id));
});

export default router;
