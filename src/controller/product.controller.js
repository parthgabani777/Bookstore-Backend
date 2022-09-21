import { getAllProducts, getProduct } from "../db/product.db.js";
import { responseDataSerialize } from "../serialize.js";

export async function getAllProductsController(req, res) {
    const products = await getAllProducts();
    res.status(200).json(responseDataSerialize({ products: products }));
}

export async function getProductController(req, res) {
    const productId = req.params.productId;
    const product = await getProduct(productId);
    console.log(product);
    res.status(200).json(responseDataSerialize({ product: product }));
}
