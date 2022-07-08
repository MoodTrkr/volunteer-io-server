import { timeStamp } from 'console';
import { Pool, Client } from 'pg';
import { conditions as dc } from 'zapatos/db';
import * as db from 'zapatos/db';
import type * as mdtkrSchema from 'mdtkr/schema';
import type * as schema from 'zapatos/schema';
import connection from './connection';

const insertUsageData = (user: string, time: Date, usageData: mdtkrSchema.MTData.MTUsageData) => {
    const insert: schema.usage_data_table.Insertable = {
        id_user: user,
        ts: time,
        usage_data: JSON.stringify(usageData)
    };
    return db.insert('usage_data_table', insert).run(connection);
};

const getUsageData = ( user: string, time: Date ) => {
    const where: schema.usage_data_table.Whereable = {
        id_user: user,
        ts: time
    };
    return db.select('usage_data_table', where).run(connection);
};

const getAllUsageData = (user: string) => {
    const where: schema.usage_data_table.Whereable = {
        id_user: user
    };
    return db.select('usage_data_table', where).run(connection);
};

export {
    insertUsageData,
    getUsageData,
    getAllUsageData
};