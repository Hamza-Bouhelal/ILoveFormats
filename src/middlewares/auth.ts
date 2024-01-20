import { getConfig } from '../utils/config';
import { Request, Response, NextFunction } from 'express';

const { API_KEY } = getConfig();

export const authValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}