import express, { NextFunction, Request, Response } from 'express';
import { checkJwtDev } from '../../auth/authDev';
import * as controller from '../../controllers/dev/devController';


const router = express.Router();
router.get('/get', checkJwtDev, controller.getAllUsageData);

export default router;