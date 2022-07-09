import { Request, Response } from 'express';
import controller from '../util/controller';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import * as usageRepo from '../../repositories/usageDataRepo';
import * as wrappers from '../util/wrappers';
import { ExpressExtended } from  '../../data/interface/express';

import * as mdtkrSchema from '../../data/report/schema';
import isMTUsageData from "../../data/report/guard";
import type * as schema from 'zapatos/schema';
import { transaction } from 'zapatos/db';
import { JWTPayload } from 'express-oauth2-jwt-bearer';

require('dotenv').config({ path: './src/auth/secret-key.env' });

function isStringDefined(str: string | undefined): str is string {
    return str !== undefined;
}

const insertUsageData = controller((req: ExpressExtended.AuthenticatedRequest, res: Response) => {
    console.log('insert begin');
    console.log("user", req.user);
    console.log("auth", req.auth);
    
    console.log(req.body);
    const userId = req.auth?.payload.sub;
    const usageDataDate = req.query.date;
    const usageData = req.body;
    const usageDataCheck = isMTUsageData(req.body);

    console.log("isMTUsageData", isMTUsageData)

    if (isStringDefined(userId)
        && typeof usageDataDate === "number"
        && usageDataCheck) {
        usageRepo.insertUsageData(userId, usageDataDate, usageData)
        res.status(200).send(true);
    }
    else { res.status(200).send(false); }
});

const getUsageData = async (req: ExpressExtended.AuthenticatedRequest, res: Response) => {
    console.log('get begin');
    const params = req.body;
    wrappers.basic((req: ExpressExtended.AuthenticatedRequest) => {
        const user = req.user;
        console.log(user);
        const usageData = req.body;
        // if (isUserDefined(user)) { usageRepo.getUsageData(user, usageData.date) }
    })
};

export {
    insertUsageData,
    getUsageData
}