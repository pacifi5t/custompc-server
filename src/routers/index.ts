import { Router } from 'express';
import userRouter from 'routers/UserRouter';
import itemRouter from 'routers/ItemRouter';
import customBuildRouter from 'routers/CustomBuildRouter';
import companyBuildRouter from 'routers/CompanyBuildRouter';
import partRouter from 'routers/PartRouter';
import softwareRouter from 'routers/SoftwareRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/custombuilds', customBuildRouter);
router.use('/companybuilds', companyBuildRouter);
router.use('/parts', partRouter);
router.use('/software', softwareRouter);

export default router;
