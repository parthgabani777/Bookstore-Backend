import express from "express";
import {
    getAllProductsController,
    getProductController,
} from "../controller/product.controller.js";
import { asyncHandler } from "./util.js";

export const productRouter = express.Router();

productRouter.get("/", asyncHandler(getAllProductsController));
productRouter.get("/:productId", asyncHandler(getProductController));
