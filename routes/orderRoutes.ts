import express, { Response } from "express";
import Order from "../models/Order";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = express.Router();

// Create Order
router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
        const { items, totalPrice, deliveryAddress } = req.body;

        if (!items || !totalPrice || !deliveryAddress) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const order = await Order.create({
            user: req.user?.id,
            items,
            totalPrice,
            deliveryAddress,
        });

        res.status(201).json(order);
    } catch (err) {
        console.error("Order create error:", err);
        res.status(500).json({ message: "Failed to create order" });
    }
});

// Get logged-in user's orders
router.get("/my-orders", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
        const orders = await Order.find({ user: req.user?.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});

// Get single order
router.get("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch order" });
    }
});
// Admin: Get all orders
router.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.email !== "admin@gmail.com") {
            return res.status(403).json({ message: "Forbidden" });
        }
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});

// Admin: Update order status (mark as delivered)
router.patch("/:id/status", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.email !== "admin@gmail.com") {
            return res.status(403).json({ message: "Forbidden" });
        }
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: "Failed to update order" });
    }
});



export default router;