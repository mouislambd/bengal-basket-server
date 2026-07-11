import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string;
        [key: string]: any;
    };
}

export const requireAuth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) {
            res.status(401).json({ message: "Unauthorized. Please login." });
            return;
        }

        req.user = session.user;
        next();
    } catch (error) {
        const err = error as Error;
        res.status(401).json({ message: "Unauthorized.", error: err.message });
    }
};