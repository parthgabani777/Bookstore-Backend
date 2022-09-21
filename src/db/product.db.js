import { HttpException } from "../error.js";
import { ProductModel } from "../model/product.model.js";

export async function getAllProducts() {
    const products = await ProductModel.find();
    return products;
}

export async function getProduct(productId) {
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
        throw new HttpException(404, "No Product found with provided id");
    }
    return product;
}
