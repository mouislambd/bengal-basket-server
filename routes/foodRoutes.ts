import express, { Request, Response } from "express";
import FoodItem from "../models/FoodItem.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = express.Router();

// GET all food items (with search, filter, sort)
router.get("/", async (req: Request, res: Response) => {
    try {
        const { search, category, sort, minPrice, maxPrice } = req.query;
        let query: any = {};

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let sortOption: any = { createdAt: -1 };
        if (sort === "priceAsc") sortOption = { price: 1 };
        if (sort === "priceDesc") sortOption = { price: -1 };
        if (sort === "rating") sortOption = { rating: -1 };

        const items = await FoodItem.find(query).sort(sortOption);
        res.json(items);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// GET items added by logged-in user (for manage page)
router.get("/user/my-items", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
        const items = await FoodItem.find({ addedBy: req.user?.email });
        res.json(items);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// GET single food item
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const item = await FoodItem.findById(req.params.id);
        if (!item) {
            res.status(404).json({ message: "Item not found" });
            return;
        }
        res.json(item);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// POST add new item (protected)
router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
        const newItem = new FoodItem({
            ...req.body,
            addedBy: req.user?.email,
        });
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
});

// DELETE item (protected)
router.delete("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
        const item = await FoodItem.findById(req.params.id);
        if (!item) {
            res.status(404).json({ message: "Item not found" });
            return;
        }
        if (item.addedBy !== req.user?.email) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }
        await item.deleteOne();
        res.json({ message: "Item deleted" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

export default router;