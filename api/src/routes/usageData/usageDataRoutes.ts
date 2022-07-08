import express, { NextFunction, Request, Response } from 'express';
import * as usageDataController from '../../controllers/usageData/usageDataController';
import { checkJwt } from '../../auth/auth';


const router = express.Router();
router.get('/get', checkJwt, usageDataController.getUsageData);
router.post('/insert', checkJwt, usageDataController.insertUsageData);

export default router;