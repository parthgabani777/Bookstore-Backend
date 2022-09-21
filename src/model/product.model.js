import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
    categoryName: String,
    rating: Number,
    discount: Number,
    image: String,
});

export const ProductModel = mongoose.model("product", ProductSchema);
