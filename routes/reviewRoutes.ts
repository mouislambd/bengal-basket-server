import express, { Request, Response } from "express";
import Review from "../models/Review.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = express.Router();

// GET all reviews for a food item
router.get("/:foodItemId", async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find({ foodItem: req.params.foodItemId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// POST add review (protected)
router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
        const newReview = new Review({
            ...req.body,
            user: req.user?.email,
            userName: req.user?.name,
        });
        const saved = await newReview.save();
        res.status(201).json(saved);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
});

export default router;