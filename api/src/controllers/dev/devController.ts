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
    var dataDecompressed = Array();
    data.forEach(async entry => {
        dataDecompressed.push(
            await zlib.brotliDecompressSync(
                Buffer.from(entry.usage_data, 'utf8')
            ).toJSON());
    })
    if (data.length>0) return res.status(200).json(dataDecompressed);
    else return res.status(200);
};

export {
    getAllUsageData
}