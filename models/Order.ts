import mongoose, { Document, Schema, Types } from "mongoose";

interface IOrderItem {
    foodItem: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    user: string;
    items: IOrderItem[];
    totalPrice: number;
    status: "pending" | "confirmed" | "delivered" | "cancelled";
    deliveryAddress: string;
}

const orderItemSchema = new Schema<IOrderItem>({
    foodItem: {
        type: Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
});

const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: String,
            required: true,
        },
        items: [orderItemSchema],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "delivered", "cancelled"],
            default: "pending",
        },
        deliveryAddress: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);