import { Request, Response } from 'express';
import controller from '../util/controller';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import * as usageRepo from '../../repositories/usageDataRepo';
import * as wrappers from '../util/promiseWrappers';
import { ExpressExtended } from  '../../data/interface/express';

import type * as mdtkrSchema from '../../data/schema';
import type * as schema from 'zapatos/schema';
import { transaction } from 'zapatos/db';

require('dotenv').config({ path: './src/auth/secret-key.env' });

// function isUserDefined(user: Express.User | undefined): user is Express.User {
//     return user !== undefined;
// }

const insertUsageData = controller((req: ExpressExtended.AuthenticatedRequest, res: Response) => {
    const params = req.body;
    console.log('insert begin');
    const user = req.user;
    console.log(user);
    console.log(req.body);
    res.status(200).send(200);
    // wrappers.basic(() => {

    //     // const usageData = req.body as mdtkrSchema.MTData.MTUsageData;
    //     // if (isUserDefined(user)) { usageRepo.insertUsageData(user, usageData.date, usageData) }
    // })
});

const getUsageData = async (req: ExpressExtended.AuthenticatedRequest, res: Response) => {
    console.log('get begin');
    const params = req.body;
    wrappers.basic(() => {
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