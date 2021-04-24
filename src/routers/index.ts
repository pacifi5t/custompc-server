import { Router } from 'express';
import userRouter from 'routers/UserRouter';
import itemRouter from 'routers/ItemRouter';
import customBuildRouter from 'routers/CustomBuildRouter';
import companyBuildRouter from 'routers/CompanyBuildRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/custombuilds', customBuildRouter);
router.use('/companybuilds', companyBuildRouter);

export default router;
