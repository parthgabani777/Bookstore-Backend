import express from "express";
import {
    addProductToWishlistController,
    getWishlistController,
    removeProductFromWishlistController,
} from "../controller/wishlist.controller.js";
import { asyncHandler } from "./util.js";

export const wishlistRouter = express.Router();

wishlistRouter.get("/", asyncHandler(getWishlistController));
wishlistRouter.post("/", asyncHandler(addProductToWishlistController));
wishlistRouter.delete(
    "/:productId",
    asyncHandler(removeProductFromWishlistController)
);
