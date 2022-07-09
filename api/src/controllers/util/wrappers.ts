import { Request, Response, NextFunction } from "express";

const basic = (f: (req: Request, res: Response) => any) => {
    (req: Request, res: Response) => {
        try {
            res.status(200).send(true)
        }
        catch {
            res.status(400).send(false);
        }
    }
}

export {
    basic
};