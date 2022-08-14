import { timeStamp } from 'console';
import { Pool, Client } from 'pg';
import { conditions as dc } from 'zapatos/db';
import zlib from 'zlib';
import * as db from 'zapatos/db';
import type * as mdtkrSchema from '../data/report/schema';
import type * as schema from 'zapatos/schema';
import connection from './connection';
import isMTUsageData from '../data/report/guard';


const getAllUsageDataDev = () => {
    return db.select('usage_data_table', {}).run(connection);
};

export {
    getAllUsageDataDev
};