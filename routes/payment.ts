// @ts-nocheck
import express, { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import Order from "../models/Order";

const router = express.Router();

const store_id = process.env.SSLCZ_STORE_ID as string;
const store_passwd = process.env.SSLCZ_STORE_PASSWORD as string;
const is_live = process.env.SSLCZ_IS_LIVE === "true";

// Step 1: Initiate Payment
router.post("/init", async (req: Request, res: Response) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const tran_id = `BB-${order._id}-${Date.now()}`;

        const data = {
            total_amount: order.totalPrice,
            currency: "BDT",
            tran_id,
            success_url: `${process.env.BETTER_AUTH_URL}/api/payment/success/${tran_id}`,
            fail_url: `${process.env.BETTER_AUTH_URL}/api/payment/fail/${tran_id}`,
            cancel_url: `${process.env.BETTER_AUTH_URL}/api/payment/cancel/${tran_id}`,
            ipn_url: `${process.env.BETTER_AUTH_URL}/api/payment/ipn`,
            shipping_method: "Courier",
            product_name: "Bengal Basket Order",
            product_category: "Food",
            product_profile: "general",
            cus_name: "Customer",
            cus_email: "customer@example.com",
            cus_add1: order.deliveryAddress || "Dhaka",
            cus_city: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: "01700000000",
            ship_name: "Customer",
            ship_add1: order.deliveryAddress || "Dhaka",
            ship_city: "Dhaka",
            ship_postcode: "1000",
            ship_country: "Bangladesh",
        };

        // Save tran_id on order before initiating
        order.transactionId = tran_id;
        await order.save();

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);

        if (apiResponse?.GatewayPageURL) {
            res.json({ url: apiResponse.GatewayPageURL });
        } else {
            res.status(400).json({ message: "Failed to init payment", apiResponse });
        }
    } catch (err) {
        console.error("Payment init error:", err);
        res.status(500).json({ message: "Payment initiation failed" });
    }
});

// Step 2: Success callback (SSLCommerz calls this via POST)
router.post("/success/:tran_id", async (req: Request, res: Response) => {
    try {
        const { tran_id } = req.params;

        const order = await Order.findOneAndUpdate(
            { transactionId: tran_id },
            { paymentStatus: "paid", paymentMethod: "sslcommerz", status: "confirmed" },
            { new: true }
        );

        res.redirect(
            `${process.env.CLIENT_URL}/payment/success?tran_id=${tran_id}`
        );
    } catch (err) {
        console.error("Payment success handler error:", err);
        res.redirect(`${process.env.CLIENT_URL}/payment/fail`);
    }
});

// Step 3: Fail callback
router.post("/fail/:tran_id", async (req: Request, res: Response) => {
    try {
        const { tran_id } = req.params;
        await Order.findOneAndUpdate(
            { transactionId: tran_id },
            { paymentStatus: "failed" }
        );
        res.redirect(`${process.env.CLIENT_URL}/payment/fail?tran_id=${tran_id}`);
    } catch (err) {
        res.redirect(`${process.env.CLIENT_URL}/payment/fail`);
    }
});

// Step 4: Cancel callback
router.post("/cancel/:tran_id", async (req: Request, res: Response) => {
    const { tran_id } = req.params;
    res.redirect(`${process.env.CLIENT_URL}/payment/cancel?tran_id=${tran_id}`);
});

// Optional: IPN listener
router.post("/ipn", async (req: Request, res: Response) => {
    res.status(200).send("IPN received");
});

export default router;