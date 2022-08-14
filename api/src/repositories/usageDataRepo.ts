import { timeStamp } from 'console';
import { Pool, Client } from 'pg';
import { conditions as dc } from 'zapatos/db';
import zlib from 'zlib';
import * as db from 'zapatos/db';
import type * as mdtkrSchema from '../data/report/schema';
import type * as schema from 'zapatos/schema';
import connection from './connection';
import isMTUsageData from '../data/report/guard';

const insertUsageData = (user: string, time: Date, usageData: mdtkrSchema.MTData.MTUsageData) => {
    var bufferObject = Buffer.from(JSON.stringify(usageData), 'utf-8');
    zlib.brotliCompress(bufferObject, (err: Error | null, zippedData: Buffer) => {
        if (err) {
            console.log("error in gzip compression", err);
        } else {
            const insert: schema.usage_data_table.Insertable = {
                id_user: user,
                ts: time,
                usage_data: zippedData
            };
            // db.constraint('usage_data_table_id_user_ts_key'), {
            //     updateColumns: db.upsert
            // }).run(connection);
            db.upsert('usage_data_table', insert,
                db.constraint('usage_data_table_id_user_ts_key'))
            .run(connection);
        }
    })
};

const getUsageData = ( user: string, time: Date ) => {
    const where: schema.usage_data_table.Whereable = {
        id_user: user,
        ts: time
    };
    return db.selectExactlyOne('usage_data_table', where).run(connection);
};

const getUsageDataUncompressed = async (user: string, time: Date) => {
    const where: schema.usage_data_table.Whereable = {
        id_user: user,
        ts: time
    };
    const entry = await db.selectExactlyOne('usage_data_table', where).run(connection);
    var decompressed = zlib.brotliDecompressSync(entry.usage_data).toJSON();

    if (isMTUsageData(decompressed)) return decompressed;
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