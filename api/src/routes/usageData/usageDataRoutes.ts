import express, { NextFunction, Request, Response } from 'express';
import * as usageDataController from '../../controllers/usageData/usageDataController';


const router = express.Router();
router.post('/get', usageDataController.getUsageData);
router.get('/insert', usageDataController.insertUsageData);

export default router;