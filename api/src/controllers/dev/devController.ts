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
    // var dataFormatted = Array();
    // data.forEach(entry => {
    //     var entryFormatted = Object()
    //     entryFormatted.id = entry.id;
    //     entryFormatted.id_user = entry.id_user;
    //     entryFormatted.ts = entry.ts;
    //     entryFormatted.usage_data = zlib.brotliDecompressSync(
    //         Buffer.from(entry.usage_data, 'base64'),
    //         { finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH }
    //     ).toString("utf8");
    //     console.log(entryFormatted.usage_data);
    //     dataFormatted.push(entryFormatted);
    // })
    // if (data.length>0) return res.status(200).json(dataFormatted);
    if (data.length > 0) return res.status(200).json(data);
    else return res.status(200);
};

export {
    getAllUsageData
}