import { Request, Response, NextFunction } from 'express';
import { verifyToken, getTokenFromHeader } from '../utils/jwt.utils';

export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = getTokenFromHeader(authHeader);

        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};