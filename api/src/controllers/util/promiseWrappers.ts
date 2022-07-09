import { Request, Response, NextFunction } from "express";

const basic = (f: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        new Promise<void>((resolve) => {
            resolve();
        })
        .then(f.call(req) )
        .then(data =>
            res.status(200).send(true)
        )
        .catch(data =>
            res.status(400).send(false)
        );
    }
}

export {
    basic
};