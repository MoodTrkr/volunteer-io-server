import { Request, Response } from 'express';
import controller from '../util/controller';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import * as usageRepo from '../../repositories/usageDataRepoDev';
import * as wrappers from '../util/wrappers';
import { ExpressExtended } from  '../../data/interface/express';

import * as mdtkrSchema from '../../data/report/schema';
import isMTUsageData from "../../data/report/guard";
import type * as schema from 'zapatos/schema';
import { ByteArrayString, transaction } from 'zapatos/db';
import { JWTPayload } from 'express-oauth2-jwt-bearer';

require('dotenv').config({ path: './src/auth/secret-key.env' });

const getAllUsageData = async (req: ExpressExtended.AuthenticatedRequest, res: Response) => {
    const data = await usageRepo.getAllUsageDataDev()
    if (data.length>0) return res.status(200).json(data);
    else return res.status(201);
};

export {
    getAllUsageData
}