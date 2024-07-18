import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

const secretKey = 'secret';

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        (req as Request & { userId: string}).userId = (decoded as { id: string }).id; // Сохраняем id пользователя в запросе
        next();
    });
};
