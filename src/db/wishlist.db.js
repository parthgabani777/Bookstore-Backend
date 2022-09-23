import { HttpException } from "../error.js";
import { UserModel } from "../model/user.model.js";
import { ProductModel } from "../model/product.model.js";

export async function getWishlist(userId) {
    const user = await UserModel.findOne({ _id: userId })
        .populate("wishlist.productId")
        .lean();

    return user.wishlist;
}

export async function addProductToWishlist(userId, productId) {
    const wishlistProduct = {
        productId: productId,
        createAt: Date.now(),
        updatedAt: Date.now(),
    };

    const product = await ProductModel.findOne({ _id: productId });

    if (!product) {
        throw new HttpException(404, "Product does not exist");
    }

    const user = await UserModel.findOneAndUpdate(
        { _id: userId, "wishlist.productId": { $nin: productId } },
        { $push: { wishlist: wishlistProduct } },
        { returnDocument: "after" }
    )
        .populate("wishlist.productId")
        .lean();

    if (!user) {
        throw new HttpException(
            400,
            "Provided product is already present in wishlist"
        );
    }

    return user.wishlist;
}

export async function removeProductFromWishlist(userId, productId) {
    const user = await UserModel.findOneAndUpdate(
        { _id: userId, "wishlist.productId": { $in: productId } },
        { $pull: { wishlist: { productId: productId } } },
        { returnDocument: "after" }
    )
        .populate("wishlist.productId")
        .lean();

    if (!user) {
        throw new HttpException(
            400,
            "Provided product is not present in wishlist"
        );
    }

    return user.wishlist;
}
