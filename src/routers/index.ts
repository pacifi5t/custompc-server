import { Router } from 'express';
import userRouter from 'routers/UserRouter'

const router = Router();

router.use('/users', userRouter);

export default router;