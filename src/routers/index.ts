import { Router } from 'express';
import userRouter from 'routers/UserRouter';
import itemRouter from 'routers/ItemRouter';
import customBuildRouter from 'routers/CustomBuildRouter';
import companyBuildRouter from 'routers/CompanyBuildRouter';
import partRouter from 'routers/PartRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/custombuilds', customBuildRouter);
router.use('/companybuilds', companyBuildRouter);
router.use('/parts', partRouter);

export default router;
