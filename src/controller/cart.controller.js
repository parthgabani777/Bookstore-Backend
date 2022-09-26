import { responseDataSerialize } from "../serialize.js";
import { flattenCart } from "./utils.js";
import {
    addProductToCart,
    changeQuantityOfCart,
    getCart,
    removeProductFormCart,
} from "../db/cart.db.js";

export async function getCartController(req, res) {
    const userId = req.user.userId;

    const cart = await getCart(userId);
    const flatCart = flattenCart(cart);

    res.status(200).json(responseDataSerialize({ cart: flatCart }));
}

export async function addProductToCartController(req, res) {
    const userId = req.user.userId;
    const { product } = req.body;
    const productId = product._id;

    const cart = await addProductToCart(userId, productId);
    const flatCart = flattenCart(cart);

    res.status(200).json(responseDataSerialize({ cart: flatCart }));
}

export async function removeProductFormCartController(req, res) {
    const userId = req.user.userId;
    const productId = req.params.productId;

    const cart = await removeProductFormCart(userId, productId);
    const flatCart = flattenCart(cart);
    res.status(200).json(responseDataSerialize({ cart: flatCart }));
}

export async function changeQuantityOfCartController(req, res) {
    const userId = req.user.userId;
    const productId = req.params.productId;
    const { action } = req.body;
    const actionType = action.type;

    const cart = await changeQuantityOfCart(userId, productId, actionType);
    const flatCart = flattenCart(cart);

    res.status(200).json(responseDataSerialize({ cart: flatCart }));
}
