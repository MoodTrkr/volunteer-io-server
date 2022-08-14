import { Request, Response, NextFunction } from "express";
import type * as mdtkrSchema from '../../data/report/schema';

export default function isMTUsageData(body: any | undefined): body is mdtkrSchema.MTData.MTUsageData {
    if (body.dailyCollection) {
        const dailyColl = body.dailyCollection;
        if (dailyColl.callLogs && dailyColl.date && dailyColl.screenTime
            && dailyColl.sleepData && dailyColl.usageLogs ) null
        else {
            return false
        }
    }
    else {
        return false
    }
    if (body.date) { null } else { return false }
    if (body.periodicCollBook) { null } else { return false }
    if (body.surveyData) { null } else { return false }
    return true;
}