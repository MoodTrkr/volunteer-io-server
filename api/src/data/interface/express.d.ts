import { Request, Application } from 'express';

export namespace ExpressExtended {
    export interface AuthenticatedRequest extends Request {
        user?: Auth0User
    }

    export interface Auth0User {
        sub?: string
    }
}
