import { Request, Response } from 'express';
import controller from '../util/controller';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import * as usageRepo from '../../repositories/usageDataRepo';
import * as wrappers from '../util/promiseWrappers'

import type * as mdtkrSchema from 'mdtkr/schema';
import type * as schema from 'zapatos/schema';
import { transaction } from 'zapatos/db';

require('dotenv').config({ path: './src/auth/secret-key.env' });

function isUserDefined(user: Express.User | undefined): user is Express.User {
    return user !== undefined;
}

const insertUsageData = async (req: Request, res: Response) => {
    const params = req.body;
    wrappers.basic(() => {
        const user = req.user;
        const usageData = req.body as mdtkrSchema.MTData.MTUsageData;
        // if (isUserDefined(user)) { usageRepo.insertUsageData(user, usageData.date, usageData) }
    })
};

const getUsageData = async (req: Request, res: Response) => {
    const params = req.body;
    wrappers.basic(() => {
        const user = req.user;
        const usageData = req.body;
        // if (isUserDefined(user)) { usageRepo.getUsageData(user, usageData.date) }
    })
};

export {
    insertUsageData,
    getUsageData
}