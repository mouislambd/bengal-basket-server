import mongoose, { Document, Schema } from "mongoose";

export interface IFoodItem extends Document {
    title: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    location: string;
    addedBy: string;
}

const foodItemSchema = new Schema<IFoodItem>(
    {
        title: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        fullDescription: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        rating: {
            type: Number,
            default: 0,
        },
        location: {
            type: String,
            required: true,
        },
        addedBy: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IFoodItem>("FoodItem", foodItemSchema);