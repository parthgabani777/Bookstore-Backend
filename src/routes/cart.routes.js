import express from "express";
import {
    addProductToCartController,
    changeQuantityOfCartController,
    getCartController,
    removeProductFormCartController,
} from "../controller/cart.controller.js";
import { asyncHandler } from "./util.js";

export const cartRouter = express.Router();

cartRouter.get("/", asyncHandler(getCartController));
cartRouter.post("/", asyncHandler(addProductToCartController));
cartRouter.delete("/:productId", asyncHandler(removeProductFormCartController));
cartRouter.post("/:productId", asyncHandler(changeQuantityOfCartController));
