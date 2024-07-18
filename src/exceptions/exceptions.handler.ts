import {NextFunction, Request, Response} from "express";

export function handle(handler: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}
