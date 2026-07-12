import express, { Request, Response } from "express";
import Newsletter from "../models/Newsletter";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: "Valid email required" });
        }

        const exists = await Newsletter.findOne({ email: email.toLowerCase() });
        if (exists) {
            return res.status(400).json({ message: "Ei email already subscribed" });
        }

        await Newsletter.create({ email: email.toLowerCase() });
        res.status(201).json({ message: "Subscribed successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Subscription failed" });
    }
});

export default router;