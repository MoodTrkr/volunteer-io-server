import { Request, Response, NextFunction } from "express";

const basic = (f: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        new Promise<void>((resolve) => {
            resolve();
        })
        .then( f.call(this, req, res, next) )
        .then(data =>
            res.status(200).json({
                status: 1
            })
        )
        .catch(data =>
            res.status(400).json({
                status: -1
            })
        );
    }
}

export {
    basic
};