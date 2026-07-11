import mongoose, { Document, Schema, Types } from "mongoose";

export interface IReview extends Document {
    foodItem: Types.ObjectId;
    user: string;
    userName: string;
    rating: number;
    comment: string;
}

const reviewSchema = new Schema<IReview>(
    {
        foodItem: {
            type: Schema.Types.ObjectId,
            ref: "FoodItem",
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IReview>("Review", reviewSchema);