import { Request, Response } from 'express';
import * as usageRepo from '../../repositories/usageDataRepoDev';
import { ExpressExtended } from  '../../data/interface/express';
import zlib from 'zlib';
import crypto from 'crypto';


require('dotenv').config({ path: './src/auth/secret-key.env' });

const encrypt = async (data: String) => {

}

const getAllUsageData = async (req: ExpressExtended.AuthenticatedRequest, res: Response) => {
    var data = await usageRepo.getAllUsageDataDev();
    var dataFormatted = Array();
    data.forEach(entry => {
        var entryFormatted = Object()
        entryFormatted.id = entry.id;
        entryFormatted.id_user = entry.id_user;
        entryFormatted.ts = entry.ts;
        zlib.brotliDecompress(entry.usage_data, (err, data) => {
            if (err) {
                console.error("brotliDecompress: An error occurred:", err);
            } else {
                entryFormatted.usage_data = data.toString("utf8");
                console.log("Decompressed data:", data.toString("utf8"));
            }
        });
        // entryFormatted.usage_data = zlib.brotliDecompressSync(
        //     entry.usage_data,
        //     { finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH }
        // ).toString("utf8");
        // console.log(entryFormatted.usage_data);
        dataFormatted.push(entryFormatted);
    })
    // data.forEach(entry => {
    //     var entryFormatted = Object()
    //     entryFormatted.id = entry.id;
    //     entryFormatted.id_user = entry.id_user;
    //     entryFormatted.ts = entry.ts;
    //     entryFormatted.usageData = Buffer.from(entry.usage_data, 'base64');
    //     dataFormatted.push(entryFormatted);
    //     // dataFormatted.push(() => {
    //     //     var entryFormatted = Object();
    //     //     entryFormatted.id = entry.id;
    //     //     entryFormatted.id_user = entry.id_user;
    //     //     entryFormatted.ts = entry.ts;
    //     //     return entryFormatted.usageData = Buffer.from(entry.usage_data, 'base64').toString();
    //     // });
    // })
    if (data.length>0) return res.status(200).json(dataFormatted);
    else return res.status(200);
};

export {
    getAllUsageData
}