import {NextFunction, Request, Response} from "express";
import {PostgresDB} from "../../database/postgres";

export enum Permissions {
    VIEW_PERMISSION =1,
    ADD_PERMISSION = 2,
    UPDATE_PERMISSION = 4,
    DELETE_PERMISSION = 8,
}
const client = PostgresDB.getClient();

const hasPermission = (userRole: Permissions, permission: Permissions) => {
    return (userRole & permission) === permission;
};

export const roleMiddleware = (requiredPermission: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req as Request & { userId: string };
            const { rows } = await client.query('SELECT role FROM users WHERE id = $1', [userId]);
            if (rows.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }

            const userRole = rows[0].role;

            if (!hasPermission(userRole, requiredPermission)) {
                return res.status(403).json({ message: 'Insufficient permissions' });
            }

            next();
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
};
