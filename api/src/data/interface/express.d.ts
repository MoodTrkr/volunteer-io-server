import { Request, Application } from 'express';

export namespace ExpressExtended {
    export interface AuthenticatedRequest extends Request {
        user?: any
    }
}
