import express, { NextFunction, Request, Response } from 'express';
import * as usageDataController from '../../controllers/usageData/usageDataController';
import { checkJwt } from '../../auth/auth';


const router = express.Router();
router.get('/get', usageDataController.getUsageData);
router.post('/insert', usageDataController.insertUsageData);
router.get('/hello', usageDataController.hello);

export default router;