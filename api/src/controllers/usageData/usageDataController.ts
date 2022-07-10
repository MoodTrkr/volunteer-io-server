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

function isAuthDefined(obj: Express.Request['auth'] | undefined): obj is Express.Request['auth'] {
    return obj !== undefined;
}

function isStringDefined(str: string | undefined | null): str is string {
    return (str !== undefined) && (str !== null);
}

const insertUsageData = controller((req: ExpressExtended.AuthenticatedRequest, res: Response) => {
    console.log('insert begin');
    console.log("user", req.user);
    console.log("auth", req.auth);
    console.log(req.body);
    
    if (!req.auth == undefined) { return res.status(400).send(false) }
    var userId = req.auth?.payload.sub;
    if (!userId == undefined) { return res.status(400).send(false) }

    const usageDataDate = req.query.date;
    const usageData = req.body;
    const usageDataCheck = isMTUsageData(req.body);

    console.log("userId", userId);
    console.log("isMTUsageData", usageDataCheck);
    console.log("typeof usageDataDate", `${typeof usageDataDate}`)

    if (isStringDefined(userId)
            && typeof usageDataDate === "number"
            && usageDataCheck) {
        usageRepo.insertUsageData(userId, usageDataDate, usageData as mdtkrSchema.MTData.MTUsageData)
        return res.status(200).send(true);
    }
    else { return res.status(200).send(false) }
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