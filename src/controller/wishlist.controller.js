import {
    addProductToWishlist,
    getWishlist,
    removeProductFromWishlist,
} from "../db/wishlist.db.js";
import { responseDataSerialize } from "../serialize.js";
import { flattenWishlist } from "./utils.js";

export async function getWishlistController(req, res) {
    const userId = req.user.userId;

    const wishlist = await getWishlist(userId);
    const flatWishlist = flattenWishlist(wishlist);

    res.status(200).json(responseDataSerialize({ wishlist: flatWishlist }));
}

export async function addProductToWishlistController(req, res) {
    const userId = req.user.userId;
    const { product } = req.body;
    const productId = product._id;

    const wishlist = await addProductToWishlist(userId, productId);
    const flatWishlist = flattenWishlist(wishlist);

    res.status(200).json(responseDataSerialize({ wishlist: flatWishlist }));
}

export async function removeProductFromWishlistController(req, res) {
    const userId = req.user.userId;
    const productId = req.params.productId;

    const wishlist = await removeProductFromWishlist(userId, productId);
    const flatWishlist = flattenWishlist(wishlist);

    res.status(200).json(responseDataSerialize({ wishlist: flatWishlist }));
}
