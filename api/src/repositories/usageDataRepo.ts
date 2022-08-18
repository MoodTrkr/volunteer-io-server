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
    zlib.brotliCompress(Buffer.from(JSON.stringify(usageData)).toString("base64"), {
        params: {
            [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT
        }
    }, (err, data) => {
        if (err) {
            console.error("error in brotli compression", err);
        } else {
            const insert: schema.usage_data_table.Insertable = {
                id_user: user,
                ts: time,
                usage_data: data
            };
            db.upsert('usage_data_table', insert,
                db.constraint('usage_data_table_id_user_ts_key'))
                .run(connection);
            console.log("Compressed data sucessfully!");
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