import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import foodRoutes from "./routes/foodRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/payment";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://bengal-basket-client.vercel.app"
    ],
    credentials: true
}));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/food", foodRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Bengal Basket Server is running! 🍛" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});