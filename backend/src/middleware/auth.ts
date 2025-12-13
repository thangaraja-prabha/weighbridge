import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        id: number;
        uname: string;
        fname: string;
        apikey: string;
        rid: number;
        pid: number | number[]; // Support both for backward compatibility
    };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'No token provided. Authorization denied.'
            });
            return;
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const jwtSecret = process.env.JWT_SECRET || 'default-secret-key';
        const decoded = jwt.verify(token, jwtSecret) as {
            id: number;
            uname: string;
            fname: string;
            apikey: string;
            rid: number;
            pid: number | number[]; // Support both for backward compatibility
        };

        // Attach user to request
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token is invalid or expired.'
        });
    }
};
